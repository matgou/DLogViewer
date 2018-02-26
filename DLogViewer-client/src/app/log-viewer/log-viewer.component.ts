import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AgentManagerService } from '../agent-manager.service'
import { LogFile } from '../log-file';
import { NavbarEventService } from '../navbar-event.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit {
  messages: string[] = new Array();
  file: LogFile;
  searchText:string;
  private agentManagerService: AgentManagerService;
  private route: ActivatedRoute;
  private navbarEventService: NavbarEventService;
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

  ngOnInit() {
    this.navbarEventService.latestSearch.subscribe(txt=> { this.searchText = txt; });
    this.navbarEventService.cleanSearch();

    let host = this.route.snapshot.paramMap.get('host');
  	let filename = this.route.snapshot.paramMap.get('filename');
  	let key = this.route.snapshot.paramMap.get('key');
  	this.file.filename = filename;
  	this.file.host = host;
  	this.file.key = key;

    this.agentManagerService.play(this.file.host, this.file.filename, '250', this.file.key).subscribe(
		(x) => {
			let reader: FileReader = new FileReader();
			reader.onload = (event) => {
				this.messages.push(reader.result);
				window.scrollTo(0,document.body.scrollHeight+50);
			}
			reader.readAsText(x.data);
		}
	);
  }
}
