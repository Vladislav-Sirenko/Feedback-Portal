import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { FeedbackService } from './feedback.service';

@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    FeedBackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
     
    ])
  ],
  providers: [FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
