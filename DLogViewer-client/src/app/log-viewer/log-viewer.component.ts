import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AgentManagerService } from '../agent-manager.service'
import { LogFile } from '../log-file';
import { SearchEventService } from '../search-event.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit {
  messages: string[] = new Array();
  file: LogFile;
  private agentManagerService: AgentManagerService;
  private route: ActivatedRoute;
  private searchEventService: SearchEventService;

  constructor(
  	agentManagerService: AgentManagerService,
  	route: ActivatedRoute,
    searchEventService: SearchEventService,
  ) {
	   this.agentManagerService = agentManagerService;
     this.route = route;
     this.searchEventService = searchEventService;
	   this.file = new LogFile();
  }

  ngOnInit() {
    this.searchEventService.cleanSearch();
    let host = this.route.snapshot.paramMap.get('host');
  	let filename = this.route.snapshot.paramMap.get('filename');
  	let key = this.route.snapshot.paramMap.get('key');
  	this.file.filename = filename;
  	this.file.host = host;
  	this.file.key = key;

    this.agentManagerService.play(this.file.host, this.file.filename, '50', this.file.key).subscribe(
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
