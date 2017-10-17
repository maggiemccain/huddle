import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChurchService } from '../../services/church.service';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'church-profile',
  templateUrl: './church.component.html',
  styleUrls: ['./church.component.scss']
})
export class ChurchComponent implements OnInit, OnDestroy {
  profileSub: Subscription;
  readonly: boolean = true;
  form: FormGroup;
  churchDetails: Object = {};

  constructor(private route: ActivatedRoute, 
  			  private churchService: ChurchService,
  			  public router: Router,
          private fb: FormBuilder,
          public mapService: MapService) { }

  ngOnInit() {
  	this.route.params.subscribe((params) => this.getChurchProfile(params.id));
     this.form = this.fb.group({
        "name": [''],
        "street": [''],
        "city":[''],
        "state":[''],
        "zip":[''],
        "adminFirstName":[''], 
        "adminLastName":[''],
        "adminEmail":['']
    });
  };
  getChurchProfile(id: any):void {
  	this.profileSub = this.churchService.getSingleChurch(id).subscribe((data) => {
  		if (data.status === 'success') {
  			this.churchDetails = data.data;
  		} else {
        console.log('ERROR: Unsuccessful API request.')
  		}
  	}, err => {
  		console.log('ERROR: ', err)
  	})
  };
  edit(): void {
    this.readonly = !this.readonly;
    if (this.readonly) {
      this.getChurchProfile(this.churchDetails['id']); // REDO WITH UNDERSCORE OR LODASH
    };
  };
  onUpdate(): void {
    this.readonly = true;
    this.form.value['zip'] = this.form.value['zip'].toString();
    let address = [this.form.value.street, this.form.value.city, this.form.value.state, this.form.value.zip];
    let geocode = this.mapService.geocodeAddress(address.toString());
    geocode.then((res) => {
        this.form.value['latitude'] = Number(res[0]);
        this.form.value['longitude'] = Number(res[1]);
        this.churchService.updateChurch(this.churchDetails['id'], this.form.value).subscribe((data) => {
          if (data.status === 'success') {
            this.churchDetails = data.data;
          } else {
           throw Error('ERROR: Unable to update church profile')
          }
        }, err => {
          throw Error('ERROR: ' + err)
        })
      })
      .catch((err) => {
        console.log('ERROR: ' + err)
      });
  };
  ngOnDestroy() {
    this.profileSub && this.profileSub.unsubscribe();
  };

}
