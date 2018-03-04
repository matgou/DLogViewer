import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { LogFile } from './log-file';

@Injectable()
export class NavbarEventService {
  latestSearch:Subject<string>=new Subject<string>();
  cleanSearchEvent:Subject<string>=new Subject<string>();
  canPauseEvent:Subject<boolean>=new Subject<boolean>();
  canPlayEvent:Subject<boolean>=new Subject<boolean>();
  pauseButtonEvent:Subject<boolean>=new Subject<boolean>();
  playButtonEvent:Subject<boolean>=new Subject<boolean>();
  sidebarButtonEvent:Subject<boolean>=new Subject<boolean>();

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
