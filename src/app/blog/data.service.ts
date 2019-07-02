import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import {Data} from './data.model';
import {environment} from '../../environments/environment'
import { AuthService } from '../auth/auth.service';

const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  resMessage: string;
  private datas: Data[] = [];
  private postsUpdated = new Subject<{datas: Data[]; max :number}>();
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  getData() {
    this.http.get<{message: string, datas:any, maxPosts: number}>(URL + "?userId=" + this.authService.getUserId())
    .pipe(
      map(fetchedData => {
        return {
          datas: fetchedData.datas.map(data => {
            return {
              title:data.title,
              content:data.content,
              id:data._id,
              status: data.status,
              date: data.date,
              top: data.top,
              imagePath: data.imagePath
            }
          }),
          maxPosts: fetchedData.maxPosts
        }
      })
    )
    .subscribe((fetchedData)=> {
        this.datas = fetchedData.datas;
        this.postsUpdated.next({
          datas: [...this.datas],
          max: fetchedData.maxPosts
        })
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  
  addPost(title: string, content: string, status: string, top: boolean, image: File) {

    const s = status || null;
    const i = image || null;

    if(i == null) {
      const formData = ({
        'title': title,
        'content': content,
        'status': s,
        'top': top
      })
      this.http.post<{message: string; data: Data}>(
        URL,
        formData
      )
      .subscribe(res => {
        window.location.reload();
      })
    }
    else {
      let url = URL +"upload/";
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content',content);
      formData.append('status', s);
      formData.append('image',image, title);
      this.http.post<{message: string; data: Data}>(
        url,
        formData
      )
      .subscribe(res => {
        window.location.reload();
      })
    }

}

  deleteData(id: string) {
    return this.http.delete(URL+"?id=" + id);
  }

  updataData(id: string, title: string, content: string, status: string, top: boolean, image: File) {

    const s = status || null;
    const reqData = {
      'id': id,
      'title': title,
      'content': content,
      'status': status,
      'top': top,
      "image": image
    };
    this.http.put<{message: string; data: Data}>(
      URL + "?id=" + id,
      reqData
    )
    .subscribe(res => {
      window.location.reload()
    })
}

}
