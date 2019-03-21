import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Department } from '../department.model';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService) { }
  Posts: string[] = [];

  ngOnInit() {
    this.feedbackService.getDepartments().subscribe((departments) => {
      for (const dep in departments) {
        if (dep) {
          this.Posts.push(dep);
        }
      }
    })
  }

}
