#!/bin/bash



# Source init functions
. /etc/init.d/functions

prog="`dirname $0`/websocketd"
args=" --binary=true --port=65000 --ssl --sslcert=cert.pem --sslkey=key.pem --staticdir=`dirname $0`/html/ ./handler.sh"

RETVAL=0

start()
{
    # Quit if disabled
    echo "Starting $prog"

    daemon $prog $args &

    RETVAL=$?

    return $RETVAL
}

stop ()
{
    echo -n $"Stopping $prog: "
    killproc $prog

    RETVAL=$?

    return $RETVAL
}

reload()
{
    echo "Reload command is not implemented for this service."
    return $RETVAL
}

restart()
{
    stop
    start
}

condrestart()
{
    echo "Not Implemented."
}

# See how we were called.
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status $prog
        ;;
    restart)
        restart
        ;;
    reload)
        reload
        ;;
    condrestart)
        condrestart
        ;;
    *)
        echo $"Usage: $0 {start|stop|status|restart|condrestart|reload}"
        RETVAL=1
esac
