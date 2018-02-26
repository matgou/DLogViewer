import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SearchEventService } from './search-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public searchText: string = '';
  searchEventService: SearchEventService;

  constructor(
    searchEventService: SearchEventService,
    private cdr: ChangeDetectorRef,
  ) {
  	this.searchEventService = searchEventService;
    this.searchEventService.cleanSearchEvent.subscribe(
        (x) => {
          console.log("CleanSearch receive");
          this.searchText = "";
          this.cdr.detectChanges();
        }
    );
  }

  ngOnInit() {
  }

  searchChange(event) {
  	this.searchEventService.updateSearch(event);
  }
}
