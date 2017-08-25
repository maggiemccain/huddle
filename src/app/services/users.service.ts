import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  getAllUsers() {
    return this.http.get('/api/posts')
      .map(res => res.json());
  }

  getAllPuppies() {
  	return this.http.get('/api/puppies')
  		.map(res => res.json());
  }

  getSinglePup() {
  	return this.http.get('/api/puppies/1')
  		.map(res => res.json());
  }

  addPup() {
  	// console.log('called add pup')
  	// 'name=Whisky&breed=annoying&age=3&sex=f'
  	let body = {name: 'Whisky',
  				breed: 'annoying',
  				age: '3',
  				sex: 'f'}
  	return this.http.post('/api/puppies', body)
  		.map(res => res.json());
  }
}
