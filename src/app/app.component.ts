import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HUDDLE';
  users: any;

  constructor(private userService: UsersService, public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {};
  login() {
    this.auth.login();
  };
  logout() {
    this.auth.logout();
  };

}
