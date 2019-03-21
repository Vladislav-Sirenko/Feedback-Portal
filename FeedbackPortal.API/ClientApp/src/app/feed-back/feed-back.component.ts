import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent implements OnInit {

  constructor() { }
  Posts:string[]=['Post 213','Post 2','Post 32','Post 3'];
  
  ngOnInit() {
  }

}
