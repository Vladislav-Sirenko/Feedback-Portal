import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AddPost } from '../_model/addPost.model';
import { environment } from '../../environments/environment';
import { Feedback } from '../FeedBacks';


@Injectable(
 
)
export class AddPostService {
  
  constructor(private _http: HttpClient) { }
  getCategories(): Observable<AddPost[]> {
    return this._http.get<AddPost[]>(environment.apiUrl + `/posts`);
  }
  postCategories(feedback: Feedback){
    return this._http.post(environment.apiUrl + `/posts`,feedback);
  }
}
