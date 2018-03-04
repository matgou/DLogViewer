import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NavbarEventService } from './navbar-event.service';
import { LogFileBagService } from './log-file-bag.service';
import { LogFile } from './log-file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public searchText: string = '';
  canPause:boolean = false;
  canPlay:boolean = false;
  isSidebarActive:boolean = true;
  navbarEventService: NavbarEventService;
  logFileBagService: LogFileBagService;
  fileBag: LogFile[] = Array();

  constructor(
    navbarEventService: NavbarEventService,
    logFileBagService: LogFileBagService,
    private cdr: ChangeDetectorRef,
  ) {
    this.logFileBagService = logFileBagService;
  	this.navbarEventService = navbarEventService;
    this.navbarEventService.cleanSearchEvent.subscribe(
        (x) => {
          console.log("CleanSearch receive");
          this.searchText = "";
          this.cdr.detectChanges();
        }
    );
    this.navbarEventService.canPauseEvent.subscribe(
        (x) => {
          this.canPause = x;
          this.cdr.detectChanges();
        }
    );
    this.navbarEventService.canPlayEvent.subscribe(
        (x) => {
          this.canPlay = x;
          this.cdr.detectChanges();
        }
    );
  }

  toggleSidebar() {
    console.log("toggle sidebar");
    if(this.isSidebarActive == true) {
      this.isSidebarActive = false;
    } else {
      this.isSidebarActive = true;
    }

    this.navbarEventService.sidebarButtonEvent.next(this.isSidebarActive);
  }

  pause() {
      console.log("pause");
      this.navbarEventService.pauseButtonEvent.next(true);
  }

  play() {
    console.log("play");
    this.navbarEventService.playButtonEvent.next(true);
  }

  ngOnInit() {
    this.logFileBagService.fileBagChangeEvent.subscribe(
      (x) => { this.fileBag = x; }
    );
  }

  searchChange(event) {
  	this.navbarEventService.updateSearch(event);
  }
}
