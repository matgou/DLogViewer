import { Pipe, PipeTransform } from '@angular/core';
import { LogFile } from './log-file';

@Pipe({
  name: 'logFileFilter'
})
export class LogFileFilterPipe implements PipeTransform {

  transform(files: LogFile[], searchText: string): any {
	console.log(searchText);
	if(searchText === undefined) {
		return files;
	}
	if(searchText == '') {
		return files;
	}
    let filteredFiles = Array();
	for(let file of files) {
		if(file.filename.indexOf(searchText) != -1) {
			filteredFiles.push(file);
		}
	}
	return filteredFiles;
  }

}
