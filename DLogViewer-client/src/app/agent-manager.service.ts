import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AgentManagerService {

  constructor(private http: HttpClient) { }

  getHosts() {
  	let url = 'assets/agents.csv';
  	let hosts = Array();

  	return this.http.get(url, {responseType: 'text'});
  }

  getFiles(host: string, key: string):Observable<MessageEvent> {
  	let ws = new WebSocket("wss://" + host);
  	console.log("Socket has been created!");
  	console.log(ws);
  	ws.onopen = function (event) {
  		console.log("Socket has been opened!");
  		ws.send(key);
  		ws.send("ls");
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

  cat(host: string, filename: string, key:string):Observable<MessageEvent> {
    let ws = new WebSocket("wss://" + host);
    console.log("Socket has been created!");
    console.log(ws);
    ws.onopen = function (event) {
      console.log("Socket has been opened!");
      ws.send(key);
      ws.send("cat");
      ws.send(filename);
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

  play(host: string, filename: string, historySize:String, key:string):Observable<MessageEvent> {
  	let ws = new WebSocket("wss://" + host);
  	console.log("Socket has been created!");
  	console.log(ws);
  	ws.onopen = function (event) {
  		console.log("Socket has been opened!");
  		ws.send(key);
  		ws.send("tail");
  		ws.send(filename);
  		ws.send(historySize);
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
