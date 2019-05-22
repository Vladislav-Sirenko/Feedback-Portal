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
import { map, startWith } from 'rxjs/operators';

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
  constructor(private service: AddPostService, private roouter: Router,
    private ChangeP: ChangePageService, private addUsers: AuthUserService) {
    this.subscription = this.ChangeP.getsetchangePager().subscribe(number => { this.succsess = number; });
    this.subscription = this.ChangeP.getUserValue().subscribe(user => { this.admin = user; });
  }
  // checkPage:number=this.ChangeP.checkChanges();

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
  postDepartmentName: string;
  postDepartmentAdress: string;
  isPositive = true;
  adminCheck = false;
  fakePosts: Department[] = [];
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
  ngOnInit() {
    this.service.getCategories().subscribe((posts) => {
      this.Posts = posts;
      console.log(this.Posts);
      this.fakePosts = posts;
    });
  }
  logOut() {
    localStorage.clear();
  }

  MenuLink1(choise: number) {
    this.menulink = choise;
    console.log(choise);
  }
  adminsProp(adminn: number) {
    this.selectedType = adminn;
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
    Post.arrived_time = this.arrived_time;
    Post.dispatch_time = this.dispatch_time;
    Post.text = '+ ' + this.text;
    Post.text += '\n' + '- ' + this.text2;
    Post.username = localStorage.getItem('Username');
    this.service.postCategories(Post).subscribe((id: number) => {
      alert('Отзыв успешно создан. Подождите,пожалуйста, пока загрузяться фото.');
      this.service.postFileEvent(id);
      this.getfeedbacksByDepartmentID(this.Posts.find(x => x.name === this.departemntName).id);
      this.departemntName = '';
    });
    this.dispatch_time = null;
    this.arrived_time = null;
    this.text2 = null;
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
    this.getfeedbacksByDepartmentID(this.Posts.find(x => x.name === this.departemntName).id);
  }
  clear() {
    this.departemntName = '';
  }
}
