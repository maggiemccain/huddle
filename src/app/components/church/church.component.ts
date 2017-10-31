import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ChurchService } from '../../services/church.service';
import { GatheringsService } from '../../services/gatherings.service';
import { MembershipService } from '../../services/membership.service';
import { UsersService } from '../../services/users.service';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs/Subscription';
import {JoinDialogComponent} from '../join-dialog/join-dialog.component'
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'church-profile',
  templateUrl: './church.component.html',
  styleUrls: ['./church.component.scss']
})
export class ChurchComponent implements OnInit, OnDestroy {
  members: Array<any> = [];
  noChurchFound: boolean = false;
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
          private membershipService: MembershipService,
          public dialog: MatDialog) { }

  ngOnInit() {
    this.noChurchFound = false;
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
  openDialog(): void { 
    let dialogRef = this.dialog.open(JoinDialogComponent, {
      width: '600px',
      data: {first: this.members[0].firstname,
              last: this.members[0].lastname,
              huddles: this.huddles }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      console.log('huddle to join', result);
    });
  };
  getChurchProfile(id: any):void {
  	this.profileSub = this.churchService.getSingleChurch(id).subscribe((data) => {
  		if (data.status === 'success') {
  			this.churchDetails = data.data[0];
        this.getChurchMembers(this.churchDetails['id']);
        this.getHuddles(this.churchDetails['id']);
  		} else {
        console.log('ERROR: Unsuccessful API request.')
        this.noChurchFound = true;
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
  getMemberHuddleCount(id:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.membershipService.getGatheringsByMember(id).subscribe((res) => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
  getChurchMembers(id: any): void {
    this.userService.getUsersByChurch(id).subscribe((users) => {
      this.members = users.data;
      this.members.forEach((member) => {
        this.getMemberHuddleCount(member.id)
          .then((res) => {
            member['huddleCount'] = res['data'].length;
          })
      })
    }, err => {
      console.log('ERROR: ', err);
    })
  };
  getHuddleMembership(id:any): any {
    return new Promise((resolve, reject) => {
      this.membershipService.getMembershipByGathering(id).subscribe((memberCount) => {
         resolve(memberCount['data'].length)
      }, err => {
        reject(err)
      })
    })
  };
  getHuddles(id: any): void {
    this.gatheringService.getGatheringsByChurch(id).subscribe((huddles) => {
      this.huddles = huddles.data;
      this.huddles.forEach((huddle) => {
        this.getHuddleMembership(huddle.id)
          .then((res) => {
            huddle['membership'] = res;
          })
          .catch((err) => {
            console.log('ERROR: ', err);
            huddle['membership'] = '';
          })
        this.getLeader(huddle.leader_id)
         .then((res) => {
            huddle['leader'] = res.firstname + ' ' + res.lastname;
         })
         .catch((err) => {
           console.log('ERROR: ', err);
           huddle['leader'] = '';
         })

      })
    }, err => {
      console.log('ERROR: ', err);
    })
  };
  getLeader(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getSingleUser(id).subscribe((user) => {
         resolve(user.data)
      }, err => {
        reject(err)
      })
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
