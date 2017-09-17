import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GatheringsService {

  constructor(private http: Http) { }

  getAllGatherings(): Observable<any> {
  	return this.http.get('/api/gatherings')
  		.map(res => res.json());
  };

  getSingleGathering(): Observable<any> {
  	let body = '3'
  	let url = '/api/gatherings/' + body
  	return this.http.get(url)
  		.map(res => res.json());
  };

  addGathering(payload?): Observable<any> {
    if (!payload) {
      let payload = {title: 'Young Adult Gathering',
          latitude: 33.9147,
          longitude: -84.3376
          }

    }
  	return this.http.post('/api/gatherings', payload)
  		.map(res => res.json());
  };

  removeGathering(): Observable<any> {
  	let body = '2'
  	let url = '/api/gatherings/' + body
  	return this.http.delete(url)
  		.map(res => res.json());
  };

  updateGathering(id): Observable<any> {
  	let body = {firstname: 'Gerald',
  				lastname: 'Griffin',
  				email: 'griffy@msn.com',
  				phone: 3}
  	let url = '/api/gatherings/' + id
  	return this.http.put(url, body)
  		.map(res => res.json());
  }

}