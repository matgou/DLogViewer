/**
 * This class modelise a LogFile
 *  * Storing agent parameters (host and key)
 *  * Storing filename /path on agent
 */
export class LogFile {
	/**
	 * Filename : the path on host
	 */
	public filename:string;
	/**
	 * Host : the host and port of agent
	 * (websocketd access)
	 */
	public host:string;
	/**
	 * key : the string to pass on agent before enter command
	 */
	public key:string;

	/**
	 * Return basename of file
	 */
	getBasename() {
		if(this.filename != undefined) {
			return this.filename.split('/').reverse()[0];
		}
	}

	/**
	 * Return the hostname of agent
	 */
	getHostname() {
		if(this.host != undefined) {
			return this.host.split(':')[0];
		}
	}
}
