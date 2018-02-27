import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ISubscription } from "rxjs/Subscription";
import { AgentManagerService } from '../agent-manager.service'
import { LogFile } from '../log-file';
import { NavbarEventService } from '../navbar-event.service';
import { Agent } from '../agent';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit,OnDestroy {
  messages: string[] = new Array();
  file: LogFile;
  searchText:string;
  isSidebarActive:boolean = true;
  private agentManagerService: AgentManagerService;
  private route: ActivatedRoute;
  private navbarEventService: NavbarEventService;
  private newMessageSubscription: ISubscription;
  blobPartsDownload:any[] = new Array();

  constructor(
  	agentManagerService: AgentManagerService,
  	route: ActivatedRoute,
    navbarEventService: NavbarEventService,
  ) {
	   this.agentManagerService = agentManagerService;
     this.route = route;
     this.navbarEventService = navbarEventService;
	   this.file = new LogFile();
  }

  download(host:string, filename:string, key:string) {
    this.agentManagerService.cat(host,filename,key).subscribe(
      data => { console.log("receive data"); this.blobPartsDownload.push(data.data); },
      error => console.log("Error downloading the file."),
      () => this.downloadFile(),
    );
  }

  downloadFile() {
    var blob = new Blob(this.blobPartsDownload, { type: "text/plain" });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
    this.blobPartsDownload = Array();
  }
  ngOnDestroy() {
    this.newMessageSubscription.unsubscribe();
  }
  
  ngOnInit() {
    this.navbarEventService.latestSearch.subscribe(txt=> { this.searchText = txt; });
    this.navbarEventService.cleanSearch();
    this.navbarEventService.canDownloadEvent.next(true);
    this.navbarEventService.canPauseEvent.next(true);
    this.navbarEventService.canPlayEvent.next(false);

    let host = this.route.snapshot.paramMap.get('host');
  	let filename = this.route.snapshot.paramMap.get('filename');
  	let key = this.route.snapshot.paramMap.get('key');
  	this.file.filename = filename;
  	this.file.agent = new Agent(host, key);

    this.navbarEventService.downloadButtonEvent.subscribe(
      (x) => { this.download(host, filename, key) }
    );

    this.navbarEventService.sidebarButtonEvent.subscribe(
          (x) => { this.isSidebarActive = x }
    );

    this.navbarEventService.pauseButtonEvent.subscribe(
          (x) => {
            this.newMessageSubscription.unsubscribe();
            this.navbarEventService.canPauseEvent.next(false);
            this.navbarEventService.canPlayEvent.next(true);
         }
    );

    this.navbarEventService.playButtonEvent.subscribe(
      (x) => {
        this.newMessageSubscription = this.agentManagerService.play(this.file.agent.url, this.file.filename, '250', this.file.agent.key).subscribe(
    		(x) => {
    			let reader: FileReader = new FileReader();
    			reader.onload = (event) => {
    				this.messages.push(reader.result);
    				window.scrollTo(0,document.body.scrollHeight+50);
    			}
    			reader.readAsText(x.data);
    		});
        this.navbarEventService.canPauseEvent.next(true);
        this.navbarEventService.canPlayEvent.next(false);
      }
    );
    this.newMessageSubscription = this.agentManagerService.play(this.file.agent.url, this.file.filename, '250', this.file.agent.key).subscribe(
		(x) => {
			let reader: FileReader = new FileReader();
			reader.onload = (event) => {
				this.messages.push(reader.result);
				window.scrollTo(window.scrollX,document.body.scrollHeight+50);
			}
			reader.readAsText(x.data);
		}
	);
  }
}
