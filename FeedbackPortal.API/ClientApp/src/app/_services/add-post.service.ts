import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs';
import { AddPost } from '../_model/addPost.model';
import { environment } from '../../environments/environment';
import { Feedback } from '../FeedBacks';
import { Department } from '../department.model';
import 'rxjs/add/operator/map';
import { Photo } from '../photo.model';
import { UserPeriod } from '../_model/period.model';


@Injectable(

)
export class AddPostService {
  _baseUrl: string;
  private _feedbackAdded = new Subject<number>();
  private _photo = new Subject<number>();
  public feedbackAdded = this._feedbackAdded.asObservable();
  public photo = this._photo.asObservable();
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  getCategories(): Observable<Department[]> {
    return this._http.get<Department[]>(this._baseUrl + 'api/Feedbacks/GetDepartments');
  }
  postCategories(feedback: Feedback) {
    return this._http.post(this._baseUrl + 'api/Feedbacks', feedback);
  }
  editFeedback(feedback: Feedback) {
    return this._http.put(this._baseUrl + 'api/Feedbacks/' + feedback.id, feedback);
  }
  getFeedbacksByDepartmentId(id: number) {
    return this._http.get<Feedback[]>(this._baseUrl + 'api/Feedbacks/' + id);
  }
  deleteFeedbacksById(id: number) {
    return this._http.delete(this._baseUrl + 'api/Feedbacks/' + id);
  }
  getFeedbacksByDepartmentMark(id: number) {
    return this._http.get<Feedback[]>(this._baseUrl + 'api/Feedbacks/' + id + '/GetFeedbacksByMark');
  }
  addDepartment(department: Department) {
    return this._http.post(this._baseUrl + 'api/Feedbacks/AddDepartment', department);
  }

  getFeedbacksByUser(userPeriod: UserPeriod) {
    return this._http.post(this._baseUrl + 'api/Feedbacks/GetByUserName', userPeriod);
  }

  postFile(fileToUpload: File[], id: number): Observable<boolean> {
    sessionStorage.removeItem('ID');
    const endpoint = this._baseUrl + 'api/Feedbacks/' + id + '/UploadFile';
    const formData: FormData = new FormData();
    for (const file of fileToUpload) {
      formData.append('fileKey' + file.name, file, file.name);
    }
    return this._http
      .post(endpoint, formData)
      .map(() => { return true; })
    // .catch((e) => this.handleError(e));
  }
  postFileEvent(id: number) {
    this._feedbackAdded.next(id);
  }
  transferPhoto(id: number) {
    this._photo.next(id);
  }
  getFirstPhoto(id: number) {
    return this._http.get<Photo>(this._baseUrl + 'api/Feedbacks/' + id + '/FirstPhoto');
  }
  getSecondPhoto(id: number) {
    return this._http.get<Photo>(this._baseUrl + 'api/Feedbacks/' + id + '/SecondPhoto');
  }
  getThirdPhoto(id: number) {
    return this._http.get<Photo>(this._baseUrl + 'api/Feedbacks/' + id + '/ThirdPhoto');
  }
}
