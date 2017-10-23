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

  getSingleGathering(id: any): Observable<any> {
  	let body = id.toString(); // might need
  	let url = '/api/gatherings/' + id
  	return this.http.get(url)
  		.map(res => res.json());
  };

  addGathering(payload: any): Observable<any> {
  	return this.http.post('/api/gatherings', payload)
  		.map(res => res.json());
  };

  removeGathering(id: any): Observable<any> {
  	let url = '/api/gatherings/' + id
  	return this.http.delete(url)
  		.map(res => res.json());
  };

  updateGathering(id): Observable<any> {
  	let body = {}
  	let url = '/api/gatherings/' + id
  	return this.http.put(url, body)
  		.map(res => res.json());
  };

  getGatheringsByChurch(id: any): Observable<any> {
    let url = '/api/gatherings/church/' + id
    return this.http.get(url)
      .map(res => res.json());
  }

}