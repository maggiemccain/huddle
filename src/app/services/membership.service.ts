import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MembershipService {

  constructor(private http: Http) { }

  getMembershipByGathering(id: any): Observable<any> {
  	let url = '/api/membership/gathering/' + id
  	return this.http.get(url)
  		.map(res => res.json())
  };

  // addChurch(payload): Observable<any> {
  // 	return this.http.post('/api/churches', payload)
  // 		.map(res => res.json());
  // };

  getGatheringsByMember(id: any): Observable<any> {
    let url = '/api/membership/member/' + id
    return this.http.get(url)
      .map(res => res.json())
  };

  newMembership(payload): Observable<any> {
    return this.http.post('/api/membership', payload)
      .map(res => res.json());
  };

}
