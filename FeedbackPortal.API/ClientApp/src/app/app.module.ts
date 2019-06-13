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
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoComponent } from './photo/photo.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoagingSpinnerComponent } from './loaging-spinner/loaging-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedBackComponent,
    FileUploadComponent,
    PhotoComponent,
    LoagingSpinnerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: 'photo', component: PhotoComponent }
    ])
  ],
  providers: [AddPostService, FeedbackService, AuthUserService, ChangePageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
