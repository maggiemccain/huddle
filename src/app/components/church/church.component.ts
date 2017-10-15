import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChurchService } from '../../services/church.service';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'church-profile',
  templateUrl: './church.component.html',
  styleUrls: ['./church.component.scss']
})
export class ChurchComponent implements OnInit, OnDestroy {
  profileSub: Subscription;
  readOnly: boolean;
  churchDetails: Object = {};
  constructor(private route: ActivatedRoute, 
  			  private churchService: ChurchService,
  			  public router: Router) { }

  ngOnInit() {
  	this.route.params.subscribe((params) => this.getChurchProfile(params.id));
  	this.readOnly = true;
  };
  getChurchProfile(id: any):void {
  	this.profileSub = this.churchService.getSingleChurch(id).subscribe((data) => {
  		if (data.status === 'success') {
  			this.churchDetails = data.data;
  			console.log(this.churchDetails)
  		} else {

  		}
  	}, err => {
  		console.log('ERROR: ', err)
  	})
  };
  edit() {
	// this.router.navigateByUrl('/church-profile/' + this.churchDetails['id']);
  };
  ngOnDestroy() {
  	this.profileSub && this.profileSub.unsubscribe();
  };


}
