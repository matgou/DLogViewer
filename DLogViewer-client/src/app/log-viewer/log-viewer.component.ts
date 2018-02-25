import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AgentManagerService } from '../agent-manager.service'

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit {
  messages: string[] = new Array();
  host: string;
  filename: string;
  
  private agentManagerService: AgentManagerService;
  private route: ActivatedRoute;
  
  constructor(
	agentManagerService: AgentManagerService,
	route: ActivatedRoute,
  ) { 
	this.agentManagerService = agentManagerService;
    this.route = route;
  }
  
  ngOnInit() {
    this.host = this.route.snapshot.paramMap.get('host');
	this.filename = this.route.snapshot.paramMap.get('filename');
    this.agentManagerService.play(this.host, this.filename, '50').subscribe(
		(x) => {
			let reader: FileReader = new FileReader();
			reader.onload = (event) => {
				console.log(reader.result); 
				this.messages.push(reader.result);
				window.scrollTo(0,document.body.scrollHeight+50);
			}
			reader.readAsText(x.data);
		}
	);
  }

}
