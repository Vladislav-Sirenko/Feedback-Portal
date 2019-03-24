import { Component, OnInit } from '@angular/core';
import { Departments } from '../PostDepatmens';////ХРАНИЛИЩЕ С ИНФОРМАЦИЕЙ///////
import { Feedback } from '../FeedBacks';//////ПРАВИЛА ДЛЯ ЗАПОЛНЕНИЯ ИНФОРМАЦИИ////////
import { post } from 'selenium-webdriver/http';
import { AddPostService } from '../_services/add-post.service'

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css'],



})
export class FeedBackComponent implements OnInit {

  constructor(private service: AddPostService) { }
  Posts: Feedback[]=[];////ПОЛУЧАЕМ ВСЕ ОТДЕЛЕНИЯИ ПУШИМ ИХ В ЛИСТ ОТДЕЛЕНИЙ////////
  id: number;
  mark: number;
  text?: string;
  date: Date;
  departemntName: string;

  selectedPost: Feedback;
  onSelect(post: Feedback): void {////СОБЫТИЕ ДЛЯ ВЫБРАНОГО ОТДЕЛЕНИЯ/////////
    this.selectedPost = post;
  }
  ShowForm: boolean = false;
  togle() {

    this.ShowForm = !this.ShowForm;
  }
  ngOnInit() {
    this.service.getCategories().subscribe((posts) => {
      for (const post in posts) {
        if (post) {
          this.Posts.push(posts[post]);
        }
      }
    })
  }
  Submit() {
    let Post = new Feedback();
    Post.departemntName = this.departemntName;
    Post.mark = this.mark;

    Post.id = 1;
    //Post.date = new Date();
    Post.text = this.text;

 //   Post.push(Post);
    this.departemntName = "";
    this.mark = 0;
    this.text = "";
  }

}
