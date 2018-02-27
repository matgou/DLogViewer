import { Host } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LogFile } from '../log-file';
import { AgentManagerService } from '../agent-manager.service';
import { AppComponent } from '../app.component';
import { NavbarEventService } from '../navbar-event.service';
import { Agent } from '../agent';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {
  private agentManagerService: AgentManagerService;
  files: LogFile[] = Array();
  searchText:string;
  filterUrl:string='';
  agents:Agent[];
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

  filterOn(agent:Agent) {
    this.files=Array();
    this.filterUrl = agent.url;
    this.agentManagerService.getFiles(agent.url, agent.key).subscribe(
    (x) => {
      let reader: FileReader = new FileReader();
      reader.onload = (event) => {
        let filenames = reader.result.split("\n");
        for(let filename of filenames) {
          if(filename != '') {
            let file = new LogFile();
            file.filename = filename;
            agent.enable = true;
            file.agent = agent;
            this.files.push(file);
          }
        }
      }
      reader.readAsText(x.data);
    }
    );
  }

  parseHostConfig(config: string) {
	  let lines = config.split("\n");
    this.agents = Array();
	  for(let line of lines) {
		  let params = line.split(";");
      let a:Agent = new Agent(params[0], params[1]);
      this.agents.push(a);
		  console.log(a);
		  this.agentManagerService.getFiles(params[0], params[1]).subscribe(
			(x) => {
				let reader: FileReader = new FileReader();
				reader.onload = (event) => {
					let filenames = reader.result.split("\n");
					for(let filename of filenames) {
						if(filename != '') {
							let file = new LogFile();
							file.filename = filename;
              a.enable = true;
							file.agent = a;
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
    this.navbarEventService.canDownloadEvent.next(false);
    this.navbarEventService.canPauseEvent.next(false);
    this.navbarEventService.canPlayEvent.next(false);

	  this.agentManagerService.getHosts().subscribe(
	    data => { this.parseHostConfig(data); }
	  );
  }
}
