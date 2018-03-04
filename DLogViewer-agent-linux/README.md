# DLogViewerClient Linux Agent

## Pre installation

- Go to installation directory : /opt/DLogViewer and checkout files
- Run `openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 100 -nodes` for create key.pem and cert.pem

## Configuration

Edit config.txt :
- Customise AGENT_KEY. You can generate random agent_key by the command `openssl rand -hex 10`
- Customise log directory

## SystemD installation

Edit dlogviewer-agent.service to change file path
```
cp dlogviewer-agent.service /etc/systemd/system/dlogviewer-agent.service
systemctl daemon-reload
systemctl start dlogviewer-agent
```

## Initd installation

Edit daemon.sh to change file path
```
cp daemon.sh /etc/init.d/dlogviewer-agent
/etc/init.d/dlogviewer-agent start
```
