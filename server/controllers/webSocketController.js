const { connectionHandler } = require("../utilities/connectionHandler");
const { broadcastConnection } = require("../utilities/broadcastConnection");

const webSocketController = (ws, req) => {
    //console.log('CONNECTING SUCCESS')
    //ws.send('YOU CONNECTED')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)

        switch (msg.method) {
            case 'connection' :
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
                break
        }
    })
}

module.exports = webSocketController