import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GatheringsService } from '../../../services/gatherings.service';
import { UsersService } from '../../../services/users.service';
import { ChurchService } from '../../../services/church.service';
import { MapService } from '../../../services/map.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-gathering-form',
  templateUrl: './gathering-form.component.html',
  styleUrls: ['./gathering-form.component.scss']
})
export class GatheringFormComponent implements OnInit {
  readonly: boolean = false;
  form: FormGroup;
  gatheringDetails: Object = {};
  churches: Array<any> = []; //later will default to their member church
  dummieLeaderId: any;
  constructor(private route: ActivatedRoute, 
  			  private gatheringService: GatheringsService,
  			  private churchService: ChurchService,
  			  private userService: UsersService,
  			  public router: Router,
          private fb: FormBuilder,
          public mapService: MapService) { 
   this.form = this.fb.group({
    "title": [''],
    "location": [''],
    "church_id":[''],
    "street":[''],
    "city":[''],
    "state":[''],
    "zip":[''],
    "schedule":[''], 
    });
   }

  ngOnInit() {
  	if (this.route.params) {
	  	this.route.params.subscribe((params) => {
	  		console.log('PARAMS RECEIVED', params.id)
	  		// this.gatheringService.getGathering(params.id).subscribe
	  	});
  	}
  	this.churchService.getAllChurches().subscribe((churchList) => {
  		this.churches = churchList.data;
  		console.log(churchList.data)
  	}, err => {
  		console.log('ERROR : ', err)
  	})
  	this.userService.getAllUsers().subscribe((userList) => {
  		this.dummieLeaderId = userList.data[0].id
  	}, err => {
  		console.log('ERROR: ', err)
  	})
  };
  onSubmit() {
  	this.form.value['zip'] = this.form.value['zip'].toString();
  	let address = [this.form.value.street, this.form.value.city, this.form.value.state, this.form.value.zip];
  	let stringAddress = address.join(' ');
  	let geocode = this.geocodeAddress(stringAddress)
  		.then((res) => {
		  	this.form.value['latitude'] = Number(res[0]);
		  	this.form.value['longitude'] = Number(res[1]);
		  	this.form.value['leader_id'] = this.dummieLeaderId;
		  	this.form.value['church_id'] = Number(this.form.value['church_id']);
		  	// MUST ADD ID FOR CHURCH AND LEADER
		  	console.log('FORM VALUE : ', this.form.value)
		    this.gatheringService.addGathering(this.form.value).subscribe(res => {
		    	if (res.status === 'success') { 
			      console.log('RESPONSE : ', res)
		    	} else {
		    		console.log('unsuccessful API call', res);	
		    	}
		    }, err => {
		    	// status 500 tends to be form value errors
		    	console.log('ERROR : ', err);
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


 // 	id serial,
 // 	title VARCHAR(100) NOT NULL,
 // 	location VARCHAR(50),
	// street VARCHAR(100),
	// city VARCHAR(20),
	// state VARCHAR(3),
 // 	latitude decimal NOT NULL,
 // 	longitude decimal NOT NULL,
	// schedule VARCHAR(100),
	// dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	// church_id int NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
	// leader_id int NOT NULL REFERENCES users(id),
	// PRIMARY KEY (church_id, leader_id),
	// UNIQUE (id)