import { Injectable } from '@angular/core';
import { LogFile } from './log-file';

@Injectable()
export class LogFileBagService {

  fileBag:LogFile[] = Array();

  constructor() { }

  clean() {
    this.fileBag = Array();
  }
  
  toggle(file:LogFile) {
    let i = this.fileBag.findIndex(x => x.filename === file.filename && x.agent.url === file.agent.url );
    if(i<0) {
      this.fileBag.push(file);
    } else {
      this.fileBag = this.fileBag.filter(x => x.filename !== file.filename || x.agent.url !== file.agent.url );
    }
  }

  contains(file:LogFile) {
    let i = this.fileBag.findIndex(x => x.filename === file.filename && x.agent.url === file.agent.url );
    if(i<0) {
      return false;
    } else {
      return true;
    }
  }
}
