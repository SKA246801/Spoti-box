const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const hbs = exphbs.create()
const app = express()
const PORT = process.env.PORT || 3001
const sess = {
  secret: 'super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(session(sess))

// turn on routes
app.use(routes)

// messaging aspect
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')
const io = socketio(server)
const bot = 'Spoti-bot'

io.on('connection', socket => {
  socket.on('joinRoom', (username, room) => {
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)

    // Welcome user
    socket.emit('message', formatMessage(bot, 'Welcome to the Chatroom'))

    // when user connects
    socket.broadcast.emit('message',  formatMessage(bot,`${user.user} has joined the chat`))
  })
  
  // listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id)
    console.log(user)
    io.emit('message', formatMessage(user[0].user, msg))
  })

  // when user disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    console.log(user);
    if (user) {
      io.emit('message',  formatMessage(bot,`${user[0].user} has left the chat`))
    }
  })

})

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening on http://localhost:' + PORT))
})