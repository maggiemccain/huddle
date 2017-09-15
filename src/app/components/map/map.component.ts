import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 33.7490;
  lng: number = -84.386330;

  constructor() { }

  ngOnInit() { 
  }


}
