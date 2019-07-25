import { Component, OnInit, Input } from '@angular/core';
import { AddPostService } from '../_services/add-post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Photo } from '../photo.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  id: number;
  photo: Observable<Photo>;
  showSpinner: boolean = false;
  constructor(private service: AddPostService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];

    });
  }

  ngOnInit() {
    this.photo = this.service.getFirstPhoto(this.id);
  }

  getFirst() {
    this.showSpinner = true;
    this.photo = this.service.getFirstPhoto(this.id);

    setTimeout(() => {
      this.photo.subscribe(() => this.showSpinner = false)
    }, 300);


  }
  getSecond() {
    this.showSpinner = true;
    this.photo = this.service.getSecondPhoto(this.id);
    setTimeout(() => {
      this.photo.subscribe(() => this.showSpinner = false)
    }, 300);

  }
  getThird() {
    this.showSpinner = true;
    this.photo = this.service.getThirdPhoto(this.id);

    setTimeout(() => {
      this.photo.subscribe(() => this.showSpinner = false)
    }, 300);

  }
}
