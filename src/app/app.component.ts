import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HUDDLE';
  users: any;

  constructor(private userService: UsersService, private authService: AuthService) {}

  ngOnInit() {};
  login() {
    this.authService.login();
  };
  logout() {
    this.authService.logout();
  };

}
