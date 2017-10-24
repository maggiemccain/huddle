import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { GatheringsService } from '../../services/gatherings.service';
import { ChurchService } from '../../services/church.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	geocoder;
  churchId: any;
  type: string;
  lat: number;
  lng: number;
  list: Object[] = []; 
  listings: any[];

  constructor(private mapService: MapService, 
              private gatheringsService: GatheringsService,
              public router: Router,
              private route: ActivatedRoute,
              private churchService: ChurchService) { }

    ngOnInit() { 
      this.geoLocation();
      this.route.params.subscribe((params) => {
        this.loadParams(params);
      }, err => {
        console.log('ERROR: ', err)
      });
    };

    geoLocation(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setTimeout(() => { //need to figure out timing issue here
            this.lat =  position.coords.latitude;
            this.lng =  position.coords.longitude;
          }, 3000)
        }, function() {
          console.log('no geo locator!')
          // this.handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        // this.handleLocationError(false, infoWindow, map.getCenter());
      }
    };

    loadParams(params: any): void {
      if (params.type) {
        this.type = params.type
        if (this.type === 'huddles') {
          this.getAllGatherings();
        } else {
          this.getAllChurches();
        }
      } else if (params.church) {
        this.type = 'huddles';
        this.churchService.getSingleChurch(params.church).subscribe((res) => {
          if (res.status === 'success') {
            this.churchId = res.data[0].id;
            this.getGatheringsByChurch(this.churchId);
          } else if (res.status === 'error') {
            alert(res.message);
          }
        }, err => {
          console.log('ERROR: ', err)
        })
      }
    };

    log(e) {
    	console.log(e.target.innerText);
    };

    createMarker(listing): void {
        this.list.push({
                       'lat': Number(listing.latitude),
                       'lng': Number(listing.longitude),
                       'label': listing.title || listing.name,
                       'draggable': false
        })
    };

  	geocodeAddress(address?): void {
        let add = address ? address : ''
      	this.mapService.getGeocoding(add).subscribe((res) => {
  			  let coords = res.toString().replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').split(' ');
  			// this.createMarker(Number(coords[0]), Number(coords[1]));
  		})

  	};

  	handleLocationError(browserHasGeolocation, infoWindow, pos) {

  		// infoWindow.setPosition(pos);
  		// infoWindow.setContent(browserHasGeolocation ?
  		//                       'Error: The Geolocation service failed.' :
  		//                       'Error: Your browser doesn\'t support geolocation.');
  		// infoWindow.open(map);
  	};

    getGatheringsByChurch(id:any): void {
      this.gatheringsService.getGatheringsByChurch(id).subscribe((gatherings) => {
        this.listings = _.cloneDeep(gatherings['data']);
        let huddles = gatherings['data']
        huddles.forEach((huddle)=> {
          this.createMarker(huddle);
        })
      }, err => {
        console.log('ERROR: ', err)
      })
    };

    getAllGatherings(): void {
      this.gatheringsService.getAllGatherings().subscribe(gatherings => {
        let huddles = gatherings['data']
        huddles.forEach((huddle)=> {
          this.createMarker(huddle);
        })
      }, err => {
          console.log('!!! --> ', err);
      })
    };

    getAllChurches(): void {
       this.churchService.getAllChurches().subscribe((churchList) => {
         this.listings = _.cloneDeep(churchList['data']);
        let churches = churchList['data']
        churches.forEach((church)=> {
          this.createMarker(church);
        })
       }, err => {
          console.log('!!! --> ', err);
      })
    };

    routeToGathering() {
      console.log('clicked on a gathering!')
    };

    viewChurchGatherings(item) {
      let selected = this.listings.filter((listItem) => item.lat === Number(listItem.latitude) && item.lng === Number(listItem.longitude));
      this.router.navigate(['/map/huddles/' + selected[0].id]);
    }
}

