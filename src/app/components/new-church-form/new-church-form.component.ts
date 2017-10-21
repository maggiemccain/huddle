import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChurchService } from '../../services/church.service';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-church-form',
  templateUrl: './new-church-form.component.html',
  styleUrls: ['./new-church-form.component.scss']
})
export class NewChurchFormComponent implements OnInit {
  form: FormGroup;
  // churchSub;
  // mapSub;
  constructor(private fb: FormBuilder, private churchService: ChurchService, private mapService: MapService, private router: Router ) { 
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
  };
  onSubmit() {
  	this.form.value['zip'] = this.form.value['zip'].toString();
  	let address = [this.form.value.street, this.form.value.city, this.form.value.state, this.form.value.zip];
  	let stringAddress = address.join(' ');
  	let geocode = this.geocodeAddress(stringAddress)
  		.then((res) => {
		  	this.form.value['latitude'] = Number(res[0]);
		  	this.form.value['longitude'] = Number(res[1]);
		    this.churchService.addChurch(this.form.value).subscribe(res => {
		    	if (res.status = 200) {
			      console.log('RESPONSE : ', res.data.rows[0].id)
			      this.router.navigateByUrl('/church-profile/' + res.data.rows[0].id)
		    	} else {
		    		console.log('unsuccessful API call',res);	
		    	}
		    }, err => {
		    	console.log(err)
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
			reject(err)
		})
  	})
  }
}
