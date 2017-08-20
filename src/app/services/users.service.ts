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
  		// .map(res => res.json());
  }
}
