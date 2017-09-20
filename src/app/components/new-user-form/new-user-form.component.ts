import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit {
	form: FormGroup;
	successNotification: boolean;

  constructor(private fb: FormBuilder, private userService: UsersService) { 
   this.form = fb.group({
        "firstname": ["", Validators.required],
        "lastname": ["", Validators.required],
        "gender":["", Validators.required],
        "dob":["", Validators.required],
        "email":["", Validators.required],
        "phone":["", Validators.required], 
        "street":["", Validators.required],
        "city":["", Validators.required],
        "state":["", Validators.required],
        "zip":["", Validators.required],
        "maritalstatus":["", Validators.required],
        "church":["", Validators.required],
        "bio":["", Validators.required],
    });
  };

  ngOnInit() {
  	this.successNotification = false;
  };
  onSubmit() {
  	console.log('clicked submit button', this.form);
    this.userService.addUser(this.form.value).subscribe(res => {
    	if (res.status = 200) {
	      console.log('new user created, ', res)
	      this.successNotification = true;
    	}
    }, err => {
    	console.log('!!! --> ', err);
    });
  };
  reset() {
  	this.form.reset();
  };
}
