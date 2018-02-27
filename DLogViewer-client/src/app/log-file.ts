import { Agent } from "./agent"
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
	public agent:Agent;

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
		if(this.agent != undefined) {
			return this.agent.hostname;
		}
	}
}
