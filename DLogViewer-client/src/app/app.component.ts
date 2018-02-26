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
  canDownload:boolean = false;
  canPause:boolean = false;
  canPlay:boolean = false;
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
    this.navbarEventService.canDownloadEvent.subscribe(
        (x) => {
          this.canDownload = x;
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

  pause() {
      console.log("pause");
      this.navbarEventService.pauseButtonEvent.next(true);
  }

  play() {
    console.log("play");
    this.navbarEventService.playButtonEvent.next(true);
  }

  download() {
    console.log("download");
    this.navbarEventService.downloadButtonEvent.next(true);
  }

  ngOnInit() {
  }

  searchChange(event) {
  	this.navbarEventService.updateSearch(event);
  }
}
