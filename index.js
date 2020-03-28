const PORT = process.env.sgToken || 8080

const path = require('path').resolve()
const express = require('express')
const socketIo = require('socket.io')
const { green } = require('chalk')
const { createServer } = require('http')
const sessions = require('./router/sessions')
const wsRouter = require('./router/websocket')
const webRouter = require('./router/web.js')

const app = express()
const server = createServer(app)
const wsServer = socketIo(server)

app.set('view engine', 'ejs')
app.use('/src', express.static(path + '/src/'))

wsRouter(wsServer, sessions)
webRouter(app, sessions)

app.use((_req, res) => res.render('404'))

server.listen(PORT, () => console.log(green('Server is now on http://localhost:' + PORT)))
