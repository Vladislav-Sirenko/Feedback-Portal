import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './department.model';

@Injectable()
export class FeedbackService {
  _baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
   }

   getDepartments(){
    return this.http.get<string[]>(this._baseUrl + 'api/Feedback');
   }

}
