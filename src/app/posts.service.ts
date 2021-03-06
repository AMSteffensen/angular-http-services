import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string ) {
    const postData: Post = {title: title, content: content};
    this.http
      .post<{ name: string }>(
        'https://app-angular-6affa.firebaseio.com/posts.json',
        postData
      )
    .subscribe(responseData => {
      console.log(responseData);
    });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://app-angular-6affa.firebaseio.com//posts.json',{
          headers: new HttpHeaders({ 'Custom-Header': 'Hello'}),
          params: new HttpParams().set('print', 'pretty')
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }


  clearPosts() {
    return this.http
      .delete<{ [key: string]: Post }>(
        'https://app-angular-6affa.firebaseio.com//posts.json'
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }
}
