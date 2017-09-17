import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { NewUserFormComponent } from '../new-user-form/new-user-form.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	users: Array<Object>;
  profile: any;

  constructor(private userService: UsersService, public auth: AuthService) {}

  ngOnInit() {
    // this.getAllUsers();

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        console.log(profile)
        this.profile = profile;
      });
    }
  };

  getAllUsers() {
    this.userService.getAllUsers().subscribe(users => {
      console.log('USERS', users['data'])
      this.users = users['data'];
    }, err => {
        console.log('!!! --> ', err);
    })

  };

  getSingleUser() {
    this.userService.getSingleUser().subscribe(user => {
      console.log('single user, ', user)
    })
  };

  updateUser(id) {
    this.userService.updateUser(id).subscribe(user => {
      console.log('updated user, ', user)
    })
    this.getAllUsers();
  }

  removeUser() {
    this.userService.removeUser().subscribe(user => {
      console.log('single user, ', user)
    })
    this.getAllUsers();

  };

  addUser() {
    this.userService.addUser().subscribe(user => {
      console.log('ADDED user, ', user)
    })
    this.getAllUsers();
  };

  // removePup() {

  // }
}
