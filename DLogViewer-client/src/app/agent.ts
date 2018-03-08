/**
 * Agent
 */
export class Agent {
  hostname:string;
  port:string;
  key:string;
  url:string;
  ssl:boolean;

  error:boolean = false;
  enable:boolean;

  constructor(url:string, key:string, ssl:boolean) {
    this.enable = false;
    this.ssl = ssl;
    this.url = url;
    let t = url.split(":");
    this.hostname = t[0];
    this.port = t[1]

    this.key = key;
  }

}
