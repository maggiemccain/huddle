import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChurchService } from '../../services/church.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-new-church-form',
  templateUrl: './new-church-form.component.html',
  styleUrls: ['./new-church-form.component.scss']
})
export class NewChurchFormComponent implements OnInit {
  form: FormGroup;
  successNotification: boolean;
  constructor(private fb: FormBuilder, private churchService: ChurchService, private mapService: MapService) { 
 // 	id SERIAL PRIMARY KEY,
 // 	name VARCHAR(100) NOT NULL,
	// street VARCHAR(100),
	// city VARCHAR(20),
	// state VARCHAR(3),
	// zip int(5),
	// latitude decimal NOT NULL,
 // 	longitude decimal NOT NULL,
 // 	adminFirstName VARCHAR(20) NOT NULL,
 // 	adminLastName VARCHAR(20) NOT NULL,
 // 	adminEmail VARCHAR(50) NOT NULL,
   this.form = fb.group({
        "name": ["", Validators.required],
        "street": ["", Validators.required],
        "city":["", Validators.required],
        "state":["", Validators.required],
        "zip":["", Validators.required],
        "adminFirstName":["", Validators.required], 
        "adminLastName":["", Validators.required],
        "adminEmail":["", Validators.required],
    });
  };

  ngOnInit() {
  	this.successNotification = false;
  };
  onSubmit() {
  	// console.log('clicked submit button', this.form);
  	this.form.value['zip'] = this.form.value['zip'].toString();
  	let address = [this.form.value.street, this.form.value.city, this.form.value.state, this.form.value.zip];
  	let stringAddress = address.join(' ');
  	let geocode = this.geocodeAddress(stringAddress)
  		.then((res) => {
		  	this.form.value['latitude'] = Number(res[0]);
		  	this.form.value['longitude'] = Number(res[1]);
		    this.churchService.addChurch(this.form.value).subscribe(res => {
		    	if (res.status = 200) {
			      console.log('new CHURCH created, ', res)
			      this.successNotification = true;
		    	} else {
		    		console.log('what happened here', res)
		    	}
		    }, err => {
		    	console.log('!!! --> ', err);
		    });
  		})
  		.catch((err) => {
  			console.log(err)
  		});
  };
  reset() {
  	this.form.reset();
  };
  geocodeAddress(address) {
  	return new Promise((resolve, reject) => {
		this.mapService.getGeocoding(address).subscribe((res) => {
			  resolve(res.toString().replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').split(' '))
		}, err => {
			console.log('ERROR: ', err)
			reject(err)
		})
  	})
  }
}
