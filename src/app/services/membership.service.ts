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

  updateMembership(payload): Observable<any> { //DEAL WITH REJOINING
     //gathering and member id 
     payload['departed'] = true;
    let url = '/api/membership/' + payload.member_id + '/' + payload.gathering_id;
    return this.http.put(url, payload)
      .map(res => res.json());
  };

  removeMembership(memberId: any, gatheringId:any): Observable<any> {
    let url = '/api/membership/' + memberId + '/' + gatheringId;
    return this.http.delete(url)
      .map(res => res.json());
  };

}
