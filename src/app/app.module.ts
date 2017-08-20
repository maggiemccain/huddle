import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersService } from './services/users.service';

const ROUTES = [
//   {
//     path: '',
//     redirectTo: 'user',
//     pathMatch: 'full'
//   },
  {
    path: 'user',
    component: UserProfileComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [ UsersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
