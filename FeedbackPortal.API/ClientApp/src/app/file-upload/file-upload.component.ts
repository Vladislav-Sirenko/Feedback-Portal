import { Component, OnInit, ElementRef } from '@angular/core';
import { AddPostService } from '../_services/add-post.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('myInputTwo')
  myInputVariableTwo: ElementRef;
  files: File[] = [];
  showSpinner: boolean = false;
  constructor(private service: AddPostService, ) { }

  ngOnInit() {
    this.service.feedbackAdded.subscribe((id) => {
      this.showSpinner = true;
      this.myInputVariableTwo.nativeElement.value = '';
      this.service.postFile(this.files, id).subscribe(() => {
        this.showSpinner = false;
        this.files = [];
      });
    });
  }

  handleFileInput2(files: FileList) {
    this.files = [];
    if(files.item(0)){
      this.files.push(files.item(0));
    }
    if(files.item(1)){
      this.files.push(files.item(1));
    }
    if(files.item(2)){
      this.files.push(files.item(2));
    }
  }
}
