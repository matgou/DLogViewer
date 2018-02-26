export class LogFile {
	public filename:string;
	public host:string;
	public key:string;

	getBasename() {
		if(this.filename != undefined) {
			return this.filename.split('/').reverse()[0];
		}
	}

	getHostname() {
		if(this.host != undefined) {
			return this.host.split(':')[0];
		}
	}
}
