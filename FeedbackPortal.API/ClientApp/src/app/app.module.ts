import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { AddPostService } from './_services/add-post.service';
import { FeedbackService } from './feedback.service';
import { AuthUserService } from './_services/auth-user.service';
import { ChangePageService } from './_services/change-page.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedBackComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SelectDropDownModule,
    FormsModule,
    RouterModule.forRoot([
     
    ])
  ],
  providers: [AddPostService,FeedbackService,AuthUserService,ChangePageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
