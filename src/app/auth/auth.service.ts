import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import {environment} from "../../environments/environment";
import {AuthData} from "./auth-data.model";
const url = environment.userApiUrl;

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private name:string;
    private authStatusListener = new Subject<boolean>();
  
    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
      }
    
      getIsAuth() {
        return this.isAuthenticated;
      }
    
      getUserId() {
        return this.userId;
      }
      
      getName() {
        return this.name;
      }

      getAuthStatusListener() {
        return this.authStatusListener.asObservable();
      }

      
    createUser(name: string, psword: string, email?:string) {
        const authData: AuthData = {name: name, psword: psword, email: email};
        this.http.post(url + "/signup", authData).subscribe(
        () => {
            this.router.navigate(["/blog"]);
        },
        error => {
            this.authStatusListener.next(false);
        }
        );
    }

    
  login(name: string, password: string, id: string) {
    const authData: AuthData = { name: name, psword:password};
    this.http
      .post<{ token: string; expiresIn: number; userId: string; name:string }>(
        url + "/login",
        authData
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.name = response.name;

            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId, this.name);
            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.name = authInformation.name;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, name:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("name",name)
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("name")
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      name:name
    };
  }
}
