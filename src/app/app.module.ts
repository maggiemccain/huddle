import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MapComponent } from './components/map/map.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: LandingPageComponent
  },
  {
    path: 'map',
    component: MapComponent
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
    NewUserFormComponent,
    LandingPageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDH14DDkf5BgZ0wedEj0aGB3RLgfL61m0c'
    }),
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [ UsersService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
