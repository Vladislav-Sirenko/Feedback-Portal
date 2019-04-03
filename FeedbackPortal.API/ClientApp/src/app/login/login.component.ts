import { Component, OnInit, Output } from '@angular/core';
import { Users } from '../FeedBacks';
import { AuthUserService } from '../_services/auth-user.service';
import { ChangePageService } from '../_services/change-page.service';
import { AuthUser } from '../_model/addPost.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  Users: AuthUser[] = [];
  name: string;
  email: string;
  password: string;
  succsess: number = null;
  changes: number;
  admin: number = null;
  constructor(private service: AuthUserService, private ChangePage: ChangePageService) {

  }

  ngOnInit() {
    this.service.getUsers().subscribe(users => {
      for (const user in users) {
        if (user) {
          this.Users.push(new AuthUser(users[user].first_name, users[user].email, users[user].password, users[user].admin));
        }
      }
    });
  }
  Submit() {
    // for(let i=0;i<this.Users.)
    //  let User=new Users();
    for (const user of this.Users) {
      console.log(user.first_name);
      console.log(user['first_name']);
      if (user.first_name === this.name && user.email === this.email && user.password === this.password) {

        if (user.admin === 1) {
          this.admin = 1;
        }
        localStorage.setItem('Username', this.name);
        console.log(this.admin);
        this.name = null;
        this.email = null;
        this.password = null;
        this.succsess = 1;
        this.ChangePage.setchangePager(this.succsess, this.admin);

        return console.log('welcome!!!');
      }

    }
    this.succsess = 0;
    console.log('something wrong');
    /* User.first_name=this.name;
      User.email=this.email;
      User.password=this.password;
     */
  }
}
