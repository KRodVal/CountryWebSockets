const { WebSocketServer } = require('ws');

const http = require('http');

const PORT = process.env.PORT || 8080;
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
server.listen(PORT, () => {
    console.log(`WebSocket en puerto ${PORT}`);
});

//---------------------------------------------

let countries = [];
wsServer.on('connection', function connection(ws){
    ws.send(JSON.stringify({type: 'countries',payload: countries}));

    ws.on('message', function incoming(message){
        const data = JSON.parse(message);
        if(data.type === 'add'){
            console.log(data.payload);

            countries.push(data.payload);
            wsServer.clients.forEach(function each(client){
                if(client !== ws /*&& client.readyState == WebSocket.OPEN*/){
                    client.send(
                        JSON.stringify({type: 'countries',payload: countries})
                    );
                };
            });
        };
    });
});