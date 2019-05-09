import { Component, OnInit } from '@angular/core';
import { AddPostService } from '../_services/add-post.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileToUpload: File = null;
  constructor(private service: AddPostService, ) { }

  ngOnInit() {
    this.service.feedbackAdded.subscribe(()=>{
      this.service.postFile(this.fileToUpload).subscribe();
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
