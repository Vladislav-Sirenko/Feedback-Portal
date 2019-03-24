import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './department.model';
import { Feedback } from './FeedBacks';

@Injectable()
export class FeedbackService {
  _baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  getDepartments() {
    return this.http.get<Department[]>(this._baseUrl + 'api/Feedbacks/GetDepartments');
  }
  addFeedback(feedback: Feedback) {
    this.http.post(this._baseUrl + 'api/Feedbacks', feedback).subscribe();
  }
  GetFeedbacks(id:number) {
    return this.http.get<Feedback[]>(this._baseUrl + 'api/Feedbacks/' + id + "/Feedbacks");
  }
}
