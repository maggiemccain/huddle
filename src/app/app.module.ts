import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersService } from './services/users.service';
import { GatheringsService } from './services/gatherings.service';
import { AuthService } from './services/auth.service';
import { MapService } from './services/map.service';
import { ChurchService } from './services/church.service';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MapComponent } from './components/map/map.component';
import { NewChurchFormComponent } from './components/new-church-form/new-church-form.component';
import { ChurchComponent } from './components/church/church.component';

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
  },
  {
    path: 'new-user',
    component: NewUserFormComponent
  },
  {
    path: 'new-church',
    component: NewChurchFormComponent
  },
  {
    path: 'church-profile/:id',
    component: ChurchComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    NewUserFormComponent,
    LandingPageComponent,
    MapComponent,
    NewChurchFormComponent,
    ChurchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AgmSnazzyInfoWindowModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [ UsersService, AuthService, MapService, GatheringsService, ChurchService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
