import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class NavbarEventService {
  latestSearch:Subject<string>=new Subject<string>();
  cleanSearchEvent:Subject<string>=new Subject<string>();

  constructor() { }

  updateSearch(searchText:string) {
	   console.log(searchText);
	   this.latestSearch.next(searchText);
  }

  cleanSearch() {
    console.log("CleanSearch");
    this.latestSearch.next("");
    this.cleanSearchEvent.next("");
  }

}
