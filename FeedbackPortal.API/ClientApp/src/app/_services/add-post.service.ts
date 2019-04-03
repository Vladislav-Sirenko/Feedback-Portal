import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { AddPost } from '../_model/addPost.model';
import { environment } from '../../environments/environment';
import { Feedback } from '../FeedBacks';
import { Department } from '../department.model';


@Injectable(

)
export class AddPostService {
  _baseUrl: string;
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  getCategories(): Observable<Department[]> {
    return this._http.get<Department[]>(this._baseUrl + 'api/Feedbacks/GetDepartments');
  }
  postCategories(feedback: Feedback) {
    return this._http.post(this._baseUrl + 'api/Feedbacks', feedback);
  }
  getFeedbacksByDepartmentId(id: number) {
    return this._http.get<Feedback[]>(this._baseUrl + 'api/Feedbacks/' + id);
  }
  addDepartment(department: Department) {
    return this._http.post(this._baseUrl + 'api/Feedbacks/AddDepartment', department);
  }
}
