import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {
  currentUserProfile: any;

  constructor(private http: Http) { }

  getAllUsers(): Observable<any> {
  	return this.http.get('/api/users')
  		.map(res => res.json());
  };

  getSingleUser(): Observable<any> {
  	let body = '3'
  	let url = '/api/users/' + body;
  	return this.http.get(url)
  		.map(res => res.json());
  };

  getUserByEmail(email: string): Observable<any> {
    let url = '/api/users/email/' + email;
    return this.http.get(url)
      .map(res => res.json());
  }

  addUser(payload): Observable<any> {
  	return this.http.post('/api/users', payload)
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
  };

  getCurrentUser(): any {
    return this.currentUserProfile
  };

  setCurrentUser(userProfile: any) {
    this.currentUserProfile = userProfile;
  };
}