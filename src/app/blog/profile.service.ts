import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";import {environment} from '../../environments/environment'
import { AuthService } from '../auth/auth.service';
import {Profile} from '../blog/profile.model'
import { strictEqual } from 'assert';

const Url = environment.profileUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile: Profile[];
  private profileUpdated = new Subject<{profile: Profile[]}>();


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getProfile() {
    this.http.get<{message:string, profile:any}>(Url + "?userId=" + this.authService.getUserId())
    .pipe(
      map(fetchedData =>{
        return {
          profile: fetchedData.profile.map(profile => {
            return {
              avatarPath: profile.avatarPath,
              bio: profile.bio,
              social: profile.social
            }
          }),
        }
      })
    )
    .subscribe((fetchedData) => {
      this.profile = fetchedData.profile;
      this.profileUpdated.next({
        profile:[...this.profile]
      })
    })
  }

  getProfileUpdataListener() {
    return this.profileUpdated.asObservable();
  }

  creatProfile(bio:string, social: string[], avatar: File) {
    
  }


}
