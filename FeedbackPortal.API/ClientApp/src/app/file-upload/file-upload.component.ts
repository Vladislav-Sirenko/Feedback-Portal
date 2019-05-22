import { Component, OnInit } from '@angular/core';
import { AddPostService } from '../_services/add-post.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileToUpload: File = null;
  fileToUpload1: File = null;
  fileToUpload2: File = null;
  files: File[] = [];
  constructor(private service: AddPostService, ) { }

  ngOnInit() {
    this.service.feedbackAdded.subscribe((id) => {
      if (this.fileToUpload) { this.files.push(this.fileToUpload); }
      if (this.fileToUpload1) { this.files.push(this.fileToUpload1); }
      if (this.fileToUpload2) { this.files.push(this.fileToUpload2); }
      this.fileToUpload = null;
      this.fileToUpload1 = null;
      this.fileToUpload2 = null;
      this.service.postFile(this.files, id).subscribe(() => {
        alert('Фото добалены');
        this.files = [];
      });
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  handleFileInput1(files: FileList) {
    this.fileToUpload1 = files.item(0);
  }
  handleFileInput2(files: FileList) {
    this.fileToUpload2 = files.item(0);
  }
}
