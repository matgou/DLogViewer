import { Injectable } from '@angular/core';
import { LogFile } from './log-file';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LogFileBagService {

  fileBag:LogFile[] = Array<LogFile>();
  fileBagChangeEvent:Subject<Array<LogFile>>=new Subject<Array<LogFile>>();

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
    this.fileBagChangeEvent.next(this.fileBag);
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
