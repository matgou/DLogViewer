import { Component } from '@angular/core';
import { SearchEventService } from './search-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public searchText: string;
  searchEventService: SearchEventService;
	  
  constructor(
    searchEventService: SearchEventService,
  ) { 
  	this.searchEventService = searchEventService;
  }
  
  searchChange(event) {
	this.searchEventService.updateSearch(event);
  }
}
