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
  selectedPost: Department;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  menulink = 1;
  feedbacks: Feedback[] = [];
  Frst_Name: string;
  Email: string;
  Password: string;
  selectedType: number;
  selectedAdmin: number;
  postDepartmentName: string;
  postDepartmentAdress: string;
  isPositive = true;
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
  onSelect(post: Department): void {
    // tslint:disable-next-line:no-unused-expression
    this.feedbacks = [];
    this.selectedPost = post;
    this.getfeedbacksByDepartmentID(this.Posts.find(x => x.Name === this.departemntName).Id);
  }
  onSearchChange(searchValue: string) {
    if (this.PostsNames.includes(searchValue)) {
      this.getfeedbacksByDepartmentID(this.Posts.find(x => x.Name === this.departemntName).Id);
    }
  }

  // tslint:disable-next-line:no-shadowed-variable
  onChange(post: any) {
    this.departemntName = post.Name;
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
    this.Posts = [];
    this.service.getCategories().subscribe((posts) => {
      console.log(posts);
      // tslint:disable-next-line:no-shadowed-variable
      for (const post in posts) {
        if (post) {
          this.Posts.push(new Department(posts[post]['name'], posts[post]['address'], posts[post]['id']));
          this.PostsNames.push(posts[post]['name']);
          console.log(this.PostsNames);
        }
      }
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.departemntName = value;
    if (this.PostsNames.includes(this.departemntName)) {
      this.getfeedbacksByDepartmentID(this.Posts.find(x => x.Name === this.departemntName).Id);
    }
    return this.PostsNames.filter(option => option.toLowerCase().includes(filterValue));
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
    User.email = this.Email;
    User.password = this.Password;
    User.admin = 0;
    this.addUsers.setUser(User);
    this.Frst_Name = null;
    this.Email = null;
    this.Password = null;

  }

  Submit() {
    const Post = new Feedback();
    Post.departmentId = this.Posts.find(x => x.Name === this.departemntName).Id;
    Post.mark = this.mark;
    Post.department_time = this.department_time;
    Post.arrived_time = this.arrived_time;
    Post.dispatch_time = this.dispatch_time;
    Post.text =  '+ ' + this.text;
    Post.text += '\n' + '- ' + this.text2;
    Post.username = localStorage.getItem('Username');
    this.service.postCategories(Post).subscribe((id: number) => {
      this.service.postFileEvent(id);
      this.getfeedbacksByDepartmentID(this.Posts.find(x => x.Name === this.departemntName).Id);

    });
    this.departemntName = '';
    this.mark = null;
    this.text = null;

  }
  getfeedbacksByDepartmentID(id: number) {
    this.service.getFeedbacksByDepartmentId(id).subscribe((feedbacks) => {
      this.feedbacks = [];
      // tslint:disable-next-line:forin
      for (const feedback in feedbacks) {
        console.log(feedbacks);
        this.feedbacks.push(feedbacks[feedback]);
      }
    });
  }
  addDepartment() {
    const department = new Department(this.postDepartmentName, this.postDepartmentAdress, 1);
    this.service.addDepartment(department).subscribe(() => {
      this.service.getCategories().subscribe((posts) => {
        this.Posts = [];
        // tslint:disable-next-line:no-shadowed-variable
        for (const post in posts) {
          if (post) {
            this.Posts.push(new Department(posts[post]['name'], posts[post]['address'], posts[post]['id']));
          }
        }
        this.postDepartmentName = null;
        this.postDepartmentAdress = null;
      });
    });
  }
  getPhoto(photo: string) {
    this.photo = photo;
    this.roouter.navigate(['photo']);
    this.service.transferPhoto(photo);
  }
  inPhotoMode(): boolean {
    return window.location.href.includes('/photo');
  }
}
