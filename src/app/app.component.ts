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

  // login() {
  //   this.auth.login();
  //   // this.auth.getProfile();
  //   this.auth.getProfile((err, profile) => {
  //     console.log('PROFILE:', profile)
  //     this.profile = profile;
  //     this.getUserByEmail(this.profile.nickname + '@gmail.com');
  //   }, err=> {
  //     console.log('ERROR: ', err)
  //   });
  //   }
  // };
  // getUserByEmail(email:string) {
  //   this.userService.getUserByEmail(email).subscribe((res) => {
  //     if (res.status === 'success' && res.message === 'No user found') {
  //         console.log(res)
  //        // create new user --> callback to new-user form after google login?
  //        // this.addUser();
  //         this.router.navigate(['/new-user']);
  //     } else if (res.status === 'success' && res.message === 'One user found') {
  //       console.log('SUCCESSFULLY GOT YOU', res)
  //       this.currentUser = res.data[0];
  //       this.userService.setCurrentUser(this.currentUser);
  //       this.router.navigate(['/welcome']);
  //     }
  //   }, err => {
  //     console.log('ERRORRRRR', err)
  //   })
  // };