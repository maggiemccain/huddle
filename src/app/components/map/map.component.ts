import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

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
	  lng: -84.3712,
	  label: 'Passion City Church Youth Group',
	  draggable: false
  	},
  	{
	  lat: 33.7568,
	  lng: -84.3544,
	  label: 'Young Adults Serve Group',
	  draggable: false
  	}
  ]

  constructor(private mapService: MapService) { }

    ngOnInit() { 
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
          	console.log(position)
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
    }

    log(e) {
    	console.log('yup ', e.target.innerText)
    }

    createMarker(lat, lng) {
    	let marker = {	
    					'lat': lat,
    					'lng': lng,
    					'label': 'TBD',
    					'draggable': false
    				};
    	this.huddles.push(marker)
    }

	geocodeAddress(address) {
    	this.mapService.getGeocoding( '240 N Highland Ave, Atlanta GA 30307' ).subscribe((res) => {
			let coords = res.toString().replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').split(' ');
			this.createMarker(Number(coords[0]), Number(coords[1]));
		})

	}
	handleLocationError(browserHasGeolocation, infoWindow, pos) {

		// infoWindow.setPosition(pos);
		// infoWindow.setContent(browserHasGeolocation ?
		//                       'Error: The Geolocation service failed.' :
		//                       'Error: Your browser doesn\'t support geolocation.');
		// infoWindow.open(map);
	}
}

