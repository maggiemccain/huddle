import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	users: Array<Object>;
  constructor(private userService: UsersService) {}

  ngOnInit() {
  	this.userService.getAllUsers().subscribe(users => {
  		// console.log('users', users)
  		// this.users = users
  	}, err => {
  		console.log('!!!  --> ', err);
  	})
    this.getAllPups();
  }

  getAllPups() {
    this.userService.getAllPuppies().subscribe(pups => {
      console.log('PUPS', pups)
      this.users = pups['data'];
    }, err => {
        console.log('!!! --> ', err);
    })

  }

  getSinglePup() {
    this.userService.getSinglePup().subscribe(pup => {
      console.log('single pup, ', pup)
    })
    this.getAllPups();
  }

  addPup() {
    this.userService.addPup().subscribe(pup => {
      console.log('ADDED pup, ', pup)
    })
    // this.getAllPups();
    // console.log(this.users)

  }

  // removePup() {

  // }
}
