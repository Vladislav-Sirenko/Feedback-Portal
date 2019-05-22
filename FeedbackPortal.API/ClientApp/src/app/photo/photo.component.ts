import { Component, OnInit, Input } from '@angular/core';
import { AddPostService } from '../_services/add-post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Photo } from '../photo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  id: number;
  photo: Observable<Photo>;
  constructor(private service: AddPostService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.photo = this.service.getFirstPhoto(this.id);
  }

  getFirst() {
    this.photo = this.service.getFirstPhoto(this.id);
  }
  getSecond() {
    this.photo = this.service.getSecondPhoto(this.id);
  }
  getThird() {
    this.photo = this.service.getThirdPhoto(this.id);
  }
}
