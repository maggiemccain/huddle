import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  getAllUsers(): Observable<any> {
  	return this.http.get('/api/users')
  		.map(res => res.json());
  };

  getSingleUser(): Observable<any> {
  	let body = '3'
  	let url = '/api/users/' + body
  	return this.http.get(url)
  		.map(res => res.json());
  };

  addUser(): Observable<any> {
  	let body = {firstname: 'Ester',
  				lastname: 'Hinkly',
  				email: 'eh.atl09@uga.org',
  				phone: 7}
  	return this.http.post('/api/users', body)
  		.map(res => res.json());
  };

  removeUser(): Observable<any> {
  	let body = '2'
  	let url = '/api/users/' + body
  	return this.http.delete(url)
  		.map(res => res.json());
  };

  updateUser(id): Observable<any> {
  	let body = {firstname: 'Gerald',
  				lastname: 'Griffin',
  				email: 'griffy@msn.com',
  				phone: 3}
  	let url = '/api/users/' + id
  	return this.http.put(url, body)
  		.map(res => res.json());
  }
}