import { Component, OnInit, Input } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {TableService} from '../../services/table.service'

@Component({
  selector: 'huddle-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() displayedColumns: Object[];
  @Input() dataSource: Object[] 

  constructor(private tableService: TableService) { }

  ngOnInit() {
  	// this.tableService.getDataSource().subscribe((res) => {
  	// 	// this.dataSource = res.data;
  	// 	console.log('DATA SOURCE RECEIVED ', res)
  	// }, err => { //DO MORE WITH ERROR
  	// 	console.log('ERROR: ', err);
  	// })
  }

}


// export class TableDataSource extends DataSource<any> {
//   // * Connect function called by the table to retrieve one stream containing the data to render. 
//   connect(): Observable<Object[]> {
//     return Observable.of(data);
//   }

//   disconnect() {}
// }
