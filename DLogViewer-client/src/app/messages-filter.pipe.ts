import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messagesFilter'
})
export class MessagesFilterPipe implements PipeTransform {

  transform(messages: string[], searchText: string): any {
    let filteredMessages = Array();

    if(searchText === undefined) {
  		return messages;
  	}
  	if(searchText == '') {
  		return messages;
  	}

  	for(let message of messages) {
  		if(message.indexOf(searchText) != -1) {
  			filteredMessages.push(message);
  		}
  	}
  	return filteredMessages;
  }

}
