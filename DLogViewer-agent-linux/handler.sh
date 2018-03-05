#!/bin/bash
# This script handle websocket connection
# read on stdin : key, command and extra parameters

AgentDirectory=$( dirname $0 )
LogFile=$AgentDirectory/log.txt
configFile=$AgentDirectory/config.txt

. $configFile

tstFilename() {
  ls $PATH_PATERN | grep -Eq "^$1\$"
  RC=$?
  if [ "$RC" != "0" ]
  then
	log "Fichier non valide"
	exit 255
  fi
}

# Read filename and histoSize on STDIN
# tail this logfile
cmdTail() {
    read filename
    log "filename=$filename"
	tstFilename $filename
    read histoSize
    log "histoSize=$histoSize"

    IFS=''
    tail -n $histoSize $filename | while read line;
    do 
        echo "$line"
        cat /dev/null
    done
    tail -n 0 -f $filename
}

# cat file
cmdCat() {
    read filename
    log "filename=$filename"
	tstFilename $filename

    cat $filename
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

# Fix to kill all child on exit
trap 'kill $(jobs -p)' EXIT

read cmd
case $cmd in
  "ls")
    cmdLs	
  ;;
  "cat")
    cmdCat
  ;;
  "tail")
    cmdTail
  ;;  
esac

exit 0
