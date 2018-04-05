const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage} = require('./utils/message.js')

const publicPath = path.join(__dirname, '../public')
var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('client is visting the app');

socket.emit('newMessage',generateMessage('admin','Wellcome to the chat'))

socket.broadcast.emit('newMessage',generateMessage('admin','New User Join the Chat'))



  socket.on('disconnect', function () {
    console.log('client is leaving the app');
    })

    socket.on('createMessage', (message,callback)=> {
      io.emit('newMessage',generateMessage(message.from,message.text))
      callback(" Server: message recived");
    })
})

server.listen(port, () => {
  console.log('Server is up and running, Port'+port);
})
