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
	private users: Array<Object>;
  private profile: any;
  public currentUser: any;

  constructor(private userService: UsersService, public auth: AuthService) {}

  ngOnInit() {
    // this.getAllUsers();

    if (this.auth.userProfile !== undefined) {
      this.profile = this.auth.userProfile;
      this.getUserByEmail(this.profile.nickname + '@gmail.com');
    } else {
      this.auth.getProfile((err, profile) => {
        console.log('PROFILE:', profile, err);
        this.profile = profile;
        this.getUserByEmail(this.profile.nickname + '@gmail.com');
      });
    }
  };

  getUserByEmail(email:string) {
    this.userService.getUserByEmail(email).subscribe((res) => {
      if (res.status === 'success' && res.message === 'No user found') {
          console.log(res)
         // create new user --> callback to new-user form after google login?
         this.addUser();
      } else if (res.status === 'success' && res.message === 'One user found') {
        console.log(res)
        this.currentUser = res.data[0];
        this.userService.setCurrentUser(this.currentUser);
      }
    }, err => {
      console.log('ERRORRRRR', err)
    })
  };

  getAllUsers() {
    this.userService.getAllUsers().subscribe(users => {
      console.log('USERS', users['data'])
      this.users = users['data'];
    }, err => {
        console.log('!!! --> ', err);
    })

  };

  getSingleUser(id:any) {
    this.userService.getSingleUser(id).subscribe(user => {
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
    let user = 
      {
        firstname: this.profile.given_name,
        lastname: this.profile.family_name,
        email: this.profile.nickname + '@gmail.com'
      };
    this.userService.addUser(user).subscribe(user => {
      console.log('ADDED user, ', user)
    }, err => {
      console.log('ERROR: ', err)
    })
    // this.getAllUsers();
  };

  // removePup() {

  // }
}
