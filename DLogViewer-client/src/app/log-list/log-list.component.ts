import { Host } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LogFile } from '../log-file';
import { Router } from '@angular/router';
import { AgentManagerService } from '../agent-manager.service';
import { AppComponent } from '../app.component';
import { NavbarEventService } from '../navbar-event.service';
import { LogFileBagService } from '../log-file-bag.service';
import { Agent } from '../agent';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {
  private agentManagerService: AgentManagerService;
  files: LogFile[] = Array();
  searchText:string;
  agents:Agent[];
  activatedAgents:Agent[];
  parentComponent:AppComponent;
  navbarEventService: NavbarEventService;
  private filesSubscription: ISubscription[] = Array();
  private router: Router;
  public logFileBag:LogFileBagService;
  blobPartsDownload:any[] = new Array();

  constructor(
    @Host() parentComponent:AppComponent,
  	 agentManagerService: AgentManagerService,
	   navbarEventService: NavbarEventService,
     router: Router,
     logFileBag:LogFileBagService,
  ) {
  	this.agentManagerService = agentManagerService;
  	this.parentComponent = parentComponent;
  	this.navbarEventService = navbarEventService;
    this.router = router;
    this.logFileBag = logFileBag;
  }

  download(file:LogFile) {
    this.agentManagerService.cat(file.agent.url,file.filename,file.agent.key).subscribe(
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

  isAgentDisplay(agent:Agent):boolean {
    if(agent.error == true) { return false };
    if(agent.enable == false) { return false };
    let i = this.activatedAgents.findIndex(x => x.url === agent.url);
    if(i<0) {
      return false;
    } else {
      return true;
    }
  }

  filterOn(agent:Agent) {
    let i = this.activatedAgents.findIndex(x => x.url === agent.url);
    if(i<0) {
      this.activatedAgents.push(agent);
    } else {
      this.activatedAgents = this.activatedAgents.filter(x => x.url !== agent.url);
    }
    this.refreshList();
  }

  goToLiveBag() {
    this.router.navigate(['/tail']);
  }

  goToLive(file:LogFile) {
    this.logFileBag.clean();
    this.logFileBag.toggle(file);
    this.router.navigate(['/tail']);
  }

  parseHostConfig(config: string) {
	  let lines = config.split("\n");
    this.agents = Array();
    this.activatedAgents = Array();
	  for(let line of lines) {
		  let params = line.split(";");
      let a:Agent = new Agent(params[0], params[1]);
      this.agents.push(a);
      this.activatedAgents.push(a);
		  console.log(a);
    }
    this.refreshList();
  }

  refreshList() {
    for(let subscription of this.filesSubscription) {
      subscription.unsubscribe();
    }
    this.files = Array();
    for(let agent of this.activatedAgents) {
		    let subscription = this.agentManagerService.getFiles(agent.url, agent.key).subscribe(
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
			         },
               error => { agent.enable = false; agent.error = true; this.displayError(agent.hostname + ' error') },
			  );
        this.filesSubscription.push(subscription);
	  }
  }

  displayError(error) {
    console.log("Erreur sur socket: ");
    console.log(error);
  }

  ngOnInit() {
	  this.navbarEventService.latestSearch.subscribe(txt=> { this.searchText = txt; });
    this.navbarEventService.cleanSearch();
    this.navbarEventService.canPauseEvent.next(false);
    this.navbarEventService.canPlayEvent.next(false);

    this.logFileBag.clean();

	  this.agentManagerService.getHosts().subscribe(
	    data => { this.parseHostConfig(data); }
	  );
  }
}
