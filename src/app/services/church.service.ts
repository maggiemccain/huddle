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

  removeChurch(id: any): Observable<any> {
  	let url = '/api/churches/' + id;
  	return this.http.delete(url)
  		.map(res => res.json());
  };

  updateChurch(id, body): Observable<any> {
  	return this.http.put('/api/churches/' + id, body)
  		.map(res => res.json());
  }
}