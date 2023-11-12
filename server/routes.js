const express = require('express');
const router = express.Router();
const connectionHandler = require('./handlers/connectionHandler');

router.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);

        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'draw':
                broadcastConnection(ws, msg);
                break;
        }
    });
});

module.exports = router;
