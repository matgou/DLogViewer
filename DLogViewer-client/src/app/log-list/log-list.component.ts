import { Component, OnInit } from '@angular/core';
import { LogFile } from '../log-file';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  files: LogFile[] = Array();
  constructor() { }

  ngOnInit() {
	  let file = new LogFile();
	  file.filename = '/mnt/tank/system/middleware/nginx/front/log/access.log';
	  file.host = 'pfhd1.kapable.info:65000';
	  this.files.push(file);
  }

}
