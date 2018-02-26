#!/bin/bash
# This script handle websocket connection
# read on stdin : key, command and extra parameters

AgentDirectory=$( dirname $0 )
LogFile=$AgentDirectory/log.txt
configFile=$AgentDirectory/config.txt

. $configFile

# Read filename and histoSize on STDIN
# tail this logfile
cmdTail() {
    read filename
    log "filename=$filename"
    read histoSize
    log "histoSize=$histoSize"

    tail -n $histoSize $filename | while read line;
    do 
        echo $line
        cat /dev/null
        sync
    done
    tail -n 0 -f $filename
}

# list available file
cmdLs() {
    for patern in $PATH_PATERN
    do
      log "ls $patern"
      ls -tr $patern
    done
}

# log
log() {
 echo $( date "+%Y/%m/%d %H:%M:%S" ) $* >> $LogFile
}

# Main
log "Lancement"
read key
if [ "$key" != $AGENT_KEY ]
then
	log "invalid key : $key"
	echo "invalid key : $key"

	exit 1
fi

read cmd
case $cmd in
  "ls")
    cmdLs	
  ;;
  "tail")
    cmdTail
  ;;  
esac

exit 0
