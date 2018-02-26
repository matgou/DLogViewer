import { Host } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LogFile } from '../log-file';
import { AgentManagerService } from '../agent-manager.service';
import { AppComponent } from '../app.component';
import { NavbarEventService } from '../navbar-event.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {
  private agentManagerService: AgentManagerService;
  files: LogFile[] = Array();
  searchText:string;
  parentComponent:AppComponent;
  navbarEventService: NavbarEventService;
  blobPartsDownload:any[] = new Array();

  constructor(
    @Host() parentComponent:AppComponent,
  	 agentManagerService: AgentManagerService,
	   navbarEventService: NavbarEventService,
  ) {
  	this.agentManagerService = agentManagerService;
  	this.parentComponent = parentComponent;
  	this.navbarEventService = navbarEventService;
  }

  download(host:string, filename:string, key:string) {
    this.agentManagerService.cat(host,filename,key).subscribe(
      data => { console.log("receive data"); this.blobPartsDownload.push(data.data); },
      error => console.log("Error downloading the file."),
      () => this.downloadFile()
    );
  }

  downloadFile() {
    var blob = new Blob(this.blobPartsDownload, { type: "text/plain" });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
    this.blobPartsDownload = Array();
  }

  parseHostConfig(config: string) {
	  let lines = config.split("\n");
	  for(let line of lines) {
		  let params = line.split(";");
		  console.log(params[0]);
		  this.agentManagerService.getFiles(params[0], params[1]).subscribe(
			(x) => {
				let reader: FileReader = new FileReader();
				reader.onload = (event) => {
					let filenames = reader.result.split("\n");
					for(let filename of filenames) {
						if(filename != '') {
							let file = new LogFile();
							file.filename = filename;
							file.host = params[0];
							file.key = params[1];
							this.files.push(file);
						}
					}
				}
				reader.readAsText(x.data);
			}
			);
	  }
  }

  ngOnInit() {
	  this.navbarEventService.latestSearch.subscribe(txt=> { this.searchText = txt; });
    this.navbarEventService.cleanSearch();
	  this.agentManagerService.getHosts().subscribe(
	    data => { this.parseHostConfig(data); }
	  );
  }
}
