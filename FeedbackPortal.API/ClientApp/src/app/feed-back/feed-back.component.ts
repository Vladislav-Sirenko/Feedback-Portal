import { Component, OnInit } from '@angular/core';
import { Feedback } from '../FeedBacks';
import { FeedbackService } from '../feedback.service';
import { Department } from '../department.model';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css'],



})
export class FeedBackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService) { }
  Posts: Department[] = [];
  id: number;
  mark: number;
  text?: string;
  date: Date;
  departemntName: string;
  selPost: string;
  feedbacks: Feedback[] = [];

  selectedPost: Department;
  _id:number;
  onSelectPost(post: Department): void {
    this.selectedPost = post;
    this._id=this.selectedPost.Department_ID;
    this.getfeedbacksByDepartmentID();
  }
  
  ShowForm: boolean = false;
  togle() {

    this.ShowForm = !this.ShowForm;
  }
  ngOnInit() {
    this.feedbackService.getDepartments().subscribe((posts) => {
      for (const post in posts) {
        if (post) {
          this.Posts.push(new Department(posts[post]['name'], posts[post]['address'], posts[post]['department_ID']));
        }
      }
    })
  }
  pushPostProperties() {
    const feedback = new Feedback();
    feedback.Department_ID = this.Posts.find(x => x.Name == this.selPost).Department_ID;
    feedback.mark = this.mark;
    feedback.text = this.text;
    feedback.time = Date.now().toLocaleString();
    this.feedbackService.addFeedback(feedback);
  }
  getfeedbacksByDepartmentID(){
    this.feedbackService.GetFeedbacks(this._id).subscribe((feedbacks)=>{
      for(const feedback in feedbacks)
      this.feedbacks.push(feedbacks[feedback]);
    })
  }
}

// this.Posts.push(new Department(departments[dep].Name,
//   departments[dep].Adress,
//   departments[dep].Department_ID));