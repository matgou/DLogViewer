import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ISubscription } from "rxjs/Subscription";
import { AgentManagerService } from '../agent-manager.service'
import { LogFile } from '../log-file';
import { NavbarEventService } from '../navbar-event.service';
import { Agent } from '../agent';
import { LogFileBagService } from '../log-file-bag.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit,OnDestroy {
  messages: string[] = new Array();
  searchText:string;
  isSidebarActive:boolean = true;
  private agentManagerService: AgentManagerService;
  private route: ActivatedRoute;
  private navbarEventService: NavbarEventService;
  private newMessageSubscription: ISubscription[] = Array();
  private logFileBag:LogFileBagService;
  blobPartsDownload:any[] = new Array();

  constructor(
  	agentManagerService: AgentManagerService,
  	route: ActivatedRoute,
    navbarEventService: NavbarEventService,
    logFileBag:LogFileBagService
  ) {
	   this.agentManagerService = agentManagerService;
     this.route = route;
     this.navbarEventService = navbarEventService;
     this.logFileBag = logFileBag;
  }

  download() {
    for(let file of this.logFileBag.fileBag) {
      this.agentManagerService.cat(file.agent.url,file.filename,file.agent.key).subscribe(
        data => { console.log("receive data"); this.blobPartsDownload.push(data.data); },
        error => console.log("Error downloading the file."),
        () => this.downloadFile(),
      );
    }
  }

  downloadFile() {
    var blob = new Blob(this.blobPartsDownload, { type: "text/plain" });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
    this.blobPartsDownload = Array();
  }
  ngOnDestroy() {
    for(let subscription of this.newMessageSubscription) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.navbarEventService.latestSearch.subscribe(txt=> { this.searchText = txt; });
    this.navbarEventService.cleanSearch();
    this.navbarEventService.canDownloadEvent.next(true);
    this.navbarEventService.canPauseEvent.next(true);
    this.navbarEventService.canPlayEvent.next(false);

    this.navbarEventService.downloadButtonEvent.subscribe(
      (x) => { this.download() }
    );

    this.navbarEventService.sidebarButtonEvent.subscribe(
          (x) => { this.isSidebarActive = x }
    );

    this.navbarEventService.pauseButtonEvent.subscribe(
          (x) => {
            for(let subscription of this.newMessageSubscription) {
              subscription.unsubscribe();
            }
            this.navbarEventService.canPauseEvent.next(false);
            this.navbarEventService.canPlayEvent.next(true);
         }
    );

    this.navbarEventService.playButtonEvent.subscribe(
      (x) => {
        // Foreach file to display
        for(let file of this.logFileBag.fileBag) {
          let subscription = this.agentManagerService.play(file.agent.url, file.filename, '250', file.agent.key).subscribe(
      		(x) => {
      			let reader: FileReader = new FileReader();
      			reader.onload = (event) => {
      				this.messages.push(reader.result);
      				window.scrollTo(window.scrollX,document.body.scrollHeight+50);
      			}
      			reader.readAsText(x.data);
      		});
          // Save subscription to unsubscribe it when "pause"
          this.newMessageSubscription.push(subscription);
        }

        // Update navbar to display pause
        this.navbarEventService.canPauseEvent.next(true);
        this.navbarEventService.canPlayEvent.next(false);
      }
    );

    // Play to launch stream
    this.navbarEventService.playButtonEvent.next(true);
  }
}
