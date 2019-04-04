import { Component, OnInit } from '@angular/core';
import { Feedback, Users } from '../FeedBacks';
import { post } from 'selenium-webdriver/http';
import { AddPostService } from '../_services/add-post.service';
import { ChangePageService } from '../_services/change-page.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';

import { AuthUserService } from '../_services/auth-user.service';
import { Department } from '../department.model';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css'],



})
export class FeedBackComponent implements OnInit {
  subscription: Subscription;
  succsess: number;
  admin: number;
  constructor(private service: AddPostService, private ChangeP: ChangePageService, private addUsers: AuthUserService) {
    this.subscription = this.ChangeP.getsetchangePager().subscribe(number => { this.succsess = number; });
    this.subscription = this.ChangeP.getUserValue().subscribe(user => { this.admin = user; });
  }
  // checkPage:number=this.ChangeP.checkChanges();

  Posts: Department[] = [];
  id: number;
  mark: number;
  text: string;
  date: Date;
  departemntName: string;
  selectedPost: string;
  menulink: number = null;
  feedbacks: Feedback[] = [];
  /////////////////////////////////
  Frst_Name: string;
  Email: string;
  Password: string;
  selectedType: number;
  selectedAdmin: number;
  postDepartmentName: string;
  postDepartmentAdress: string;
  isPositive = true;
  // tslint:disable-next-line:no-shadowed-variable
  onSelect(post: string): void {
    // tslint:disable-next-line:no-unused-expression
    this.feedbacks = [];
    this.selectedPost = post;
    this.getfeedbacksByDepartmentID(this.Posts.find(x => x.Name === post).Department_ID);
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
  isPositiveT(numb:boolean){
    
    this.isPositive=numb;
  }
  ngOnInit() {
    this.Posts = [];
    this.service.getCategories().subscribe((posts) => {
      console.log(posts);
      // tslint:disable-next-line:no-shadowed-variable
      for (const post in posts) {
        if (post) {
          this.Posts.push(new Department(posts[post]['name'], posts[post]['address'], posts[post]['department_ID']));
        }
      }
    });

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
    Post.departmentId = this.Posts.find(x => x.Name === this.departemntName).Department_ID;
    Post.mark = this.mark;
    Post.text = this.isPositive ? '+' + this.text : '-' + this.text;

    Post.username = localStorage.getItem('Username');
    this.service.postCategories(Post).subscribe(() => {
      this.getfeedbacksByDepartmentID(this.Posts.find(x => x.Name === this.selectedPost).Department_ID);
    });
    this.departemntName = '';
    this.mark = null;
    this.text = null;
    // Posts: string[] = [];

    // ngOnInit() {
    //   this.feedbackService.getDepartments().subscribe((departments) => {
    //     for (const dep in departments) {
    //       if (dep) {
    //         this.Posts.push(dep);
    //       }
    //     }
    //   })
    // }

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
            this.Posts.push(new Department(posts[post]['name'], posts[post]['address'], posts[post]['department_ID']));
          }
        }
        this.postDepartmentName = null;
        this.postDepartmentAdress = null;
      });
    });
  }
}
