const { broadcastConnection } = require("./broadcastConnection");

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

module.exports = connectionHandler