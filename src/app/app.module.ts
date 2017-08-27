import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserProfileComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    NewUserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [ UsersService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
