import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TableService {
	dataSource: Subject<any> =  new Subject<any>();

	constructor() { }

	setDataSource(content: Object[]) {
		this.dataSource.next({data: content});
	};

	getDataSource():Observable<any> {
		return this.dataSource.asObservable();
	}

}
