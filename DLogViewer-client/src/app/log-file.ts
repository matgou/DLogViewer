export class LogFile {
	public filename:string;
	public host:string;
	
	getBasename() {
		return this.filename.split('/').reverse()[0];
	}
	
	getHostname() {
		return this.host.split(':')[0];
	}
}
