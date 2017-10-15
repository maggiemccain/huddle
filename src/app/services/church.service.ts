import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChurchService {

  constructor(private http: Http) { }

  getAllChurches(): Observable<any> {
  	return this.http.get('/api/churches')
  		.map(res => res.json());
  };

  getSingleChurch(id: any): Observable<any> {
  	let url = '/api/churches/' + id
  	return this.http.get(url)
  		.map(res => res.json());
  };

  addChurch(payload): Observable<any> {
  	return this.http.post('/api/churches', payload)
  		.map(res => res.json());
  };

  removeChurch(): Observable<any> {
  	let body = '2'
  	let url = '/api/churches/' + body
  	return this.http.delete(url)
  		.map(res => res.json());
  };

  updateChurch(id): Observable<any> {
  	let body = {name: 'Unitarian International',
          adminFirstName: 'Zellwig',
          adminLastName: 'CHANGED',
          adminEmail: 'zellwig@uga.org',
          street: '100 North Highland Avenue',
      	  city: 'Atlanta',
      	  state: 'GA',
      	  zip: 30307,
      	  latitude: 33.7909,
      	  longitude: -84.3857}
  	let url = '/api/churches/' + id
  	return this.http.put(url, body)
  		.map(res => res.json());
  }
}