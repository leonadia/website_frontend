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

  resMessage: string;
  private datas: Data[] = [];
  private postsUpdated = new Subject<{datas: Data[]; max :number}>();
  constructor(private http: HttpClient, private router: Router) {}

  getData() {
    this.http.get<{message: string, datas:any, maxPosts: number}>(url)
      .subscribe((fetchedData)=> {
        this.datas = fetchedData.datas;
        this.postsUpdated.next({
          datas: fetchedData.datas,
          max: fetchedData.maxPosts
        })
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, status: string) {
    const reqData = {
      'title': title,
      'content': content,
      'status': status
    };
    this.http.post<{message: string; datas: Data}>(
      url,
      reqData
    )
    .subscribe(res => {
      this.router.navigate(["/"]);
    })
}

deleteData

}
