const connectionHandler = require("../handlers/connectionHandler");
const broadcastConnection = require("../handlers/broadcastConnection");

const webSocketController = (aWss) => (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection' :
                connectionHandler(ws, msg, aWss)
                break
            case 'draw':
                broadcastConnection(ws, msg, aWss)
                break
        }
    })
}

module.exports = webSocketController