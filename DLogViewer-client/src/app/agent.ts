/**
 * Agent
 */
export class Agent {
  hostname:string;
  port:string;
  key:string;
  url:string;

  enable:boolean;

  constructor(url:string, key:string) {
    this.enable = false;
    this.url = url;
    let t = url.split(":");
    this.hostname = t[0];
    this.port = t[1]

    this.key = key;
  }

}
