import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import {Data} from './data.model';
import {environment} from '../environments/environment'

const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private datas: Data[] = [];
  private postsUpdated = new Subject<{datas: Data[]; max :number}>();
  constructor(private http: HttpClient, private router: Router) {}

  getData() {
    this.http.get<{message: string, datas:any, maxPosts: number}>(url)
      .subscribe((fetchedData)=> {
        this.datas = fetchedData.datas;
        console.log(url)
        this.postsUpdated.next({
          datas: [...this.datas],
          max: fetchedData.maxPosts
        })
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, status: string) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("status", status);
    this.http
      .post<{ message: string, data: Data }>(
        url,
        postData
      )
      .subscribe(responseData => {
        console.log(responseData)
      });
  }
}
