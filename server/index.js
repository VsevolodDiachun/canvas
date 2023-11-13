require("dotenv").config()
const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const PORT = process.env.PORT || 5002
const imageGet = require("./controllers/imageGet");
const imagePost = require("./controllers/imagePost");
const webSocketController = require("./controllers/webSocketController");

app.use(cors())
app.use(express.json())
app.ws('/', webSocketController(aWss))
app.post('/image', imagePost)
app.get('/image', imageGet)
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))