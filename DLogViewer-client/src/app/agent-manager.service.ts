import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AgentManagerService {

  constructor() { }
  
  play(host: string, filename: string, historySize:String):Observable<MessageEvent> {
	let ws = new WebSocket("ws://" + host);
	console.log("Socket has been created!");
	console.log(ws);
	ws.onopen = function (event) {
		console.log("Socket has been opened!");
		ws.send(filename);
		ws.send(historySize)
    };
	
	let observable = Observable.create(
    (observer: Observer<MessageEvent>) => {
       ws.onmessage = observer.next.bind(observer);
       ws.onerror = observer.error.bind(observer);
       ws.onclose = observer.complete.bind(observer);
       return ws.close.bind(ws);
    });
	
	return observable;
  }

}
