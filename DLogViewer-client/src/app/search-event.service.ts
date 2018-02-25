import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchEventService {
  latestSearch:Subject=new Subject();
  
  constructor() { }
  
  updateSearch(searchText:string) {
	console.log(searchText);
	this.latestSearch.next(searchText);
  }
}
