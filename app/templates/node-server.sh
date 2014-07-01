#!/bin/sh

ACTION=$1
PIDFILE="../server.pid"

#help
usage(){
    echo "Usage: ./node-server.sh {start|stop|restart}"
    exit 1;
}

get_pid(){
    if [ -f $PIDFILE ]; then
        echo `cat $PIDFILE`
    fi
}

#start server
start(){
    pid=`get_pid`

    if [ ! -z $pid ]; then
        echo 'server is already running'
    else
        cd ../server
        npm install
        node ./bin/create-package.js
        npm install
        npm update
        cd ../bin
        nohup node ../server/bin/run-server.js -m pro > /dev/null &
        echo 'server is running ...'
        echo $! > $PIDFILE
        echo 'server is run!'
    fi
}

#stop server
stop(){
    pid=`get_pid`
    if [ -z $pid ]; then
        echo 'server not running'
    else
        echo 'server is stopping ...'
        kill -15 $pid
        rm $PIDFILE
        echo 'server stopped!'
    fi
}

restart(){
    stop
    sleep 0.5
    echo '====='
    start
}

case "$ACTION" in
    start )
        start
        ;;
    stop )
        stop
        ;;
    restart )
        restart
        ;;
    *)
        usage
esac