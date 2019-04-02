import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { AuthUser } from '../_model/addPost.model';
import { Users } from '../FeedBacks';
@Injectable()
export class AuthUserService {
  _baseUrl: string;
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  getUsers(): Observable<AuthUser[]> {
    return this._http.get<AuthUser[]>( this._baseUrl + 'api/Feedbacks/GetUsers');
  }
  setUser(user: AuthUser) {
    return this._http.post(this._baseUrl + 'api/Feedbacks/AddUser', user).subscribe();
  }


}
