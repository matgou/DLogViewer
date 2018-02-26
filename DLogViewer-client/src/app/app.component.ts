import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NavbarEventService } from './navbar-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public searchText: string = '';
  navbarEventService: NavbarEventService;

  constructor(
    navbarEventService: NavbarEventService,
    private cdr: ChangeDetectorRef,
  ) {
  	this.navbarEventService = navbarEventService;
    this.navbarEventService.cleanSearchEvent.subscribe(
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
  	this.navbarEventService.updateSearch(event);
  }
}
