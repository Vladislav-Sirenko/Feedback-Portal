import { Component, OnInit, Input } from '@angular/core';
import { AddPostService } from '../_services/add-post.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @Input() photo: string;
  photos: string[] = [];
  constructor() { }

  ngOnInit() {
    this.photos = this.photo.split(' ||||||||||||||||| ');
    this.photos.pop();
  }

}
