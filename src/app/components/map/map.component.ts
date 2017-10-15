import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { GatheringsService } from '../../services/gatherings.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	geocoder;
  lat: number = 33.7490;
  lng: number = -84.386330;
  huddles: Object[] = [
                      	{
                    	  lat: 33.8172,
                    	  lng: -84.3760,
                    	  label: 'Passion City Church Youth Group',
                    	  draggable: false
                      	},
                      	{
                    	  lat: 33.7568,
                    	  lng: -84.3500,
                    	  label: 'Young Adults Serve Group',
                    	  draggable: false
                      	}
  ]

  constructor(private mapService: MapService, private gatheringsService: GatheringsService) { }

    ngOnInit() { 
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

        this.getAllGatherings();
    }

    log(e) {
    	console.log(e.target.innerText);
    };

    createMarker(huddle) {
        this.huddles.push({
                       'lat': Number(huddle.latitude),
                       'lng': Number(huddle.longitude),
                       'label': huddle.title,
                       'draggable': false 
        })
    };

	geocodeAddress(address?) {
      let add = address ? address : '240 N Highland Ave, Atlanta GA 30307'
    	this.mapService.getGeocoding(add).subscribe((res) => {
			  let coords = res.toString().replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').split(' ');
			// this.createMarker(Number(coords[0]), Number(coords[1]));
		})

	}
	handleLocationError(browserHasGeolocation, infoWindow, pos) {

		// infoWindow.setPosition(pos);
		// infoWindow.setContent(browserHasGeolocation ?
		//                       'Error: The Geolocation service failed.' :
		//                       'Error: Your browser doesn\'t support geolocation.');
		// infoWindow.open(map);
	}

  getAllGatherings() {
    this.gatheringsService.getAllGatherings().subscribe(gatherings => {
      let huddles = gatherings['data']
      huddles.forEach((huddle)=> {
        this.createMarker(huddle);
      })
    }, err => {
        console.log('!!! --> ', err);
    })

  };


}

