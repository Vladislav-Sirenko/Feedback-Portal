import { Component, OnInit } from '@angular/core';
import { Feedback, Users } from '../FeedBacks';
import { post } from 'selenium-webdriver/http';
import { AddPostService } from '../_services/add-post.service';
import { ChangePageService } from '../_services/change-page.service';
// tslint:disable-next-line:import-blacklist
import { Subscription, Observable } from 'rxjs';

import { AuthUserService } from '../_services/auth-user.service';
import { Department } from '../department.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { QPeriod, UserPeriod } from '../_model/period.model';
import { MarkIdModel } from '../_model/markId.model';
import { m } from '@angular/core/src/render3';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css'],
})
export class FeedBackComponent implements OnInit {
  subscription: Subscription;
  succsess: number;
  admin: number;
  photo: string;
  selectedUser: string;
  constructor(private service: AddPostService, private roouter: Router,
    private ChangeP: ChangePageService, private addUsers: AuthUserService) {
    this.subscription = this.ChangeP.getsetchangePager().subscribe(number => { this.succsess = number; });
    this.subscription = this.ChangeP.getUserValue().subscribe(user => { this.admin = user; });
  }
  searchtext: string;
  comments: string[] = [];
  Posts: Department[] = [];
  PostsNames: string[] = [];
  id: number;
  mark: number;
  text: string;
  text2: string;
  date: Date;
  departemntName: string;
  department_time: string;
  arrived_time: Date;
  dispatch_time: Date;
  startTime: Date;
  endTime: Date;
  historyStartTime: Date;
  historyEndTime: Date;
  selectedPost: string;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  menulink = 1;
  feedbacks: Feedback[] = [];
  Frst_Name: string;
  Password: string;
  selectedType: number;
  selectedAdmin: number;
  depName: string;
  startq : string;
  endq: string;
  postDepartmentName: string;
  postDepartmentAdress: string;
  isPositive = true;
  adminCheck = false;
  DispatchArive_time = false;
  fakePosts: Department[] = [];
  searchMark: number;
  editingFeedbackId: number;
  currentMenuLink: number;
  config = {
    displayKey: 'Name',
    search: true,
    height: '500px',
    overflow: 'hidden',
    placeholder: 'Select',
    customComparator: () => { },
    limitTo: this.Posts.length,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'Name'
  };

  // tslint:disable-next-line:no-shadowed-variable
  onSelect(post: string): void {
    // tslint:disable-next-line:no-unused-expression
    this.feedbacks = [];
    this.selectedPost = post;
  }

  // tslint:disable-next-line:no-shadowed-variable
  onChange(post: string) {
    this.departemntName = post;
  }
  // tslint:disable-next-line:member-ordering
  ShowForm = false;
  togle() {

    this.ShowForm = !this.ShowForm;
  }
  isPositiveT(numb: boolean) {

    this.isPositive = numb;
  }
  DispatchArive() {
    return this.DispatchArive_time = !this.DispatchArive_time;
  }
  ngOnInit() {
    this.service.getCategories().subscribe((posts) => {
      this.Posts = posts;
      this.fakePosts = posts;
    });
  }
  logOut() {
    localStorage.clear();
  }
  getFeedbackNameByID(id: number) {
    return this.Posts.find(x => x.id === id).name;
  }

  MenuLink1(choise: number) {
    this.menulink = choise;

  }
  adminsProp(adminn: number) {
    this.selectedType = adminn;
  }
  getFeedbacksByUser() {
    if(this.selectedUser){
    const user = new UserPeriod();
    user.userName = this.selectedUser;
    user.startTime = this.startTime;
    user.endTime = this.endTime;
    this.service.getFeedbacksByUser(user).subscribe((feedbacks: Feedback[]) => {
      this.feedbacks = feedbacks;
    });
  }
  }
  addUser() {
    const User = new Users();
    User.first_name = this.Frst_Name;
    User.password = this.Password;
    User.admin = this.adminCheck ? 1 : 0;
    this.addUsers.setUser(User).subscribe(() => {
      alert('Пользователь успешно создан');
    });
    this.Frst_Name = null;
    this.Password = null;

  }

  Submit() {
    const Post = new Feedback();
    Post.departmentId = this.Posts.find(x => x.name === this.departemntName).id;
    Post.mark = this.mark;
    Post.department_time = this.department_time;
    Post.arrived_time = null;
    Post.dispatch_time = null;
    Post.text = this.text;
    Post.username = localStorage.getItem('Username');
    this.service.postCategories(Post).subscribe((id: number) => {
      alert('Отзыв успешно создан. Подождите,пожалуйста, пока загрузяться фото.');
      this.service.postFileEvent(id);
      this.getfeedbacksByDepartmentID(this.Posts.find(x => x.name === this.departemntName).id);
      this.departemntName = '';
    });
    this.dispatch_time = null;
    this.arrived_time = null;
    this.department_time = null;
    this.mark = null;
    this.text = null;
  }
  getfeedbacksByDepartmentID(id: number) {
    this.service.getFeedbacksByDepartmentId(id).subscribe((feedbacks) => {
      this.feedbacks = [];
      // tslint:disable-next-line:forin
      this.feedbacks = feedbacks;
    });
  }
  addDepartment() {
    const department = new Department(this.postDepartmentName, 1);
    this.service.addDepartment(department).subscribe(() => {
      alert('Отделение успешно создано');
      this.service.getCategories().subscribe((posts) => {
        this.Posts = posts;
        this.postDepartmentName = null;
      });
    });
  }
  getReport() {
    this.service.getReport().subscribe((response) => {
        var newBlob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }
  
        const data = window.URL.createObjectURL(newBlob);
  
        var link = document.createElement('a');
        link.href = data;
        link.download = "ImportFile.xlsx";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  
        setTimeout(function () {
            window.URL.revokeObjectURL(data);
            link.remove();
        }, 100);
    });
    }
  deleteFeedback(id: number) {
    this.service.deleteFeedbacksById(id).subscribe(() => {
      this.service.getFeedbacksByDepartmentId(this.Posts.find(x => x.name === this.departemntName).id).subscribe((feedbacks) => {
        this.feedbacks = [];
        // tslint:disable-next-line:forin
        this.feedbacks = feedbacks;
      });
    });
  }
  checkAdmin() {
    return localStorage.getItem('Admin') === '1';
  }
  checkName() {
    return localStorage.getItem('Username');
  }
  getPhoto(id: number) {
    this.roouter.navigate(['photo'], { queryParams: { id: id } });
  }
  inPhotoMode(): boolean {
    return window.location.href.includes('/photo');
  }
  searchList() {
    this.departemntName = this.Posts.find(x => x.name.startsWith(this.departemntName)).name;
    var model = new MarkIdModel();
    model.id = this.Posts.find(x => x.name === this.departemntName).id;
    model.mark = this.searchMark;
    this.service.getFeedbacksByDepartment(model).subscribe((feedbacks:Feedback[]) => {
      this.feedbacks = [];
      // tslint:disable-next-line:forin
      this.feedbacks = feedbacks;
    });
  }
  searchListbyMark() {
    if (this.searchMark) {
      this.service.getFeedbacksByDepartmentMark(this.searchMark).subscribe(feedbacks => {
        this.feedbacks = feedbacks;
      });
    }
  }
  searchListbyDate() {
    if (this.historyStartTime && this.historyEndTime) {
      const user = new UserPeriod();
      user.startTime = this.historyStartTime;
      user.endTime = this.historyEndTime;
      this.service.getFeedbacksByUser(user).subscribe((feedbacks: Feedback[]) => {
        this.feedbacks = feedbacks;
      });
    }
  }
  searchListbyQ() {
    if (this.startq && this.endq && parseInt(this.startq) && parseInt(this.endq)) {
      const user = new QPeriod();
      user.endQ = parseInt(this.endq);
      user.startQ = parseInt(this.startq) ;
      this.service.getFeedbacksByQ(user).subscribe((feedbacks: Feedback[]) => {
        this.feedbacks = feedbacks;
      });
    }
  }
  getFeedback(id: number) {
    const feedback = this.feedbacks.find(x => x.id === id);
    this.currentMenuLink = this.menulink;
    if (feedback) {
      this.menulink = 6;
      this.editingFeedbackId = id;
      this.departemntName = this.Posts.find(x => x.id === feedback.departmentId).name;
      this.arrived_time = feedback.arrived_time;
      this.department_time = feedback.department_time;
      this.dispatch_time = feedback.dispatch_time;
      this.date = feedback.date;
      if(this.text.includes('-') && this.text.includes('+')){
      this.text = feedback.text.split('-')[0].split('+')[1];
      this.text2 = feedback.text.split('-')[1];
      }
      else this.text = feedback.text;
      this.mark = feedback.mark;
    }
  }
  editFeedback() {
    const feedback = new Feedback();
    feedback.id = this.editingFeedbackId;
    feedback.departmentId = this.Posts.find(x => x.name === this.departemntName).id;
    feedback.mark = this.mark;
    feedback.department_time = this.department_time;
    feedback.arrived_time = this.arrived_time;
    feedback.dispatch_time = this.dispatch_time;
    feedback.date = this.date;
    feedback.text = this.text ? '+ ' + this.text : '+';
    feedback.username = localStorage.getItem('Username');
    this.service.editFeedback(feedback).subscribe(() => {
      this.dispatch_time = null;
      this.arrived_time = null;
      this.department_time = null;
      this.mark = null;
      this.text = null;
      this.feedbacks = [];
      this.departemntName = null;
      this.menulink = this.currentMenuLink ? this.currentMenuLink : 2;
      this.currentMenuLink = null;
    });
  }
  clear() {
    this.feedbacks = [];
    this.historyEndTime = null;
    this.historyStartTime = null;
    this.startq = '';
    this.endq = '';
  }
  clearAllButQ(){
    this.departemntName = '';
    this.searchMark = null;
    this.feedbacks = [];
    this.historyEndTime = null;
    this.historyStartTime = null;
  }
  clearAllButDate(){
    this.departemntName = '';
    this.searchMark = null;
    this.feedbacks = [];
    this.startq = '';
    this.endq = '';
  }
}
