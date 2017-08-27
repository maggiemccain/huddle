import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NewUserFormComponent } from '../new-user-form/new-user-form.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	users: Array<Object>;
  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.getAllUsers();
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
