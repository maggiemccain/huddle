import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChurchService } from '../../services/church.service';
import { GatheringsService } from '../../services/gatherings.service';
import { MembershipService } from '../../services/membership.service';
import { UsersService } from '../../services/users.service';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'church-profile',
  templateUrl: './church.component.html',
  styleUrls: ['./church.component.scss']
})
export class ChurchComponent implements OnInit, OnDestroy {
  members: Array<any> = [];
  huddles: Array<any> = [];
  profileSub: Subscription;
  readonly: boolean = true;
  form: FormGroup;
  churchDetails: Object = {};

  constructor(private route: ActivatedRoute, 
  			  private churchService: ChurchService,
  			  public router: Router,
          private fb: FormBuilder,
          public mapService: MapService,
          private userService: UsersService,
          private gatheringService: GatheringsService,
          private membershipService: MembershipService) { }

  ngOnInit() {
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
  	this.route.params.subscribe((params) => this.getChurchProfile(params.id));
  };
  getChurchProfile(id: any):void {
  	this.profileSub = this.churchService.getSingleChurch(id).subscribe((data) => {
  		if (data.status === 'success') {
  			this.churchDetails = data.data[0];
        this.getChurchMembers(this.churchDetails['id']);
        this.getHuddles(this.churchDetails['id']);
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
  getChurchMembers(id: any): void {
    this.userService.getUsersByChurch(id).subscribe((users) => {
      this.members = users.data;
    }, err => {
      console.log('ERROR: ', err);
    })
  };
  getHuddleMembership(id:any): void {
    this.membershipService.getMembershipByGathering(id).subscribe((memberCount) => {
      console.log('MEMBER COUNT', memberCount);
    }, err => {
      console.log('ERROR: ', err);
    })
  };
  getHuddles(id: any): void {
    this.gatheringService.getGatheringsByChurch(id).subscribe((huddles) => {
      this.huddles = huddles.data;
      this.huddles.forEach((huddle) => {
        huddle['membership'] = this.getHuddleMembership(huddle.id);
      })
    }, err => {
      console.log('ERROR: ', err);
    })
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
