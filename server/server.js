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
var users=[];

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  var userName="User"+Math.floor(Math.random()*100)
  users.push(userName);
socket.emit('newUser',generateMessage('admin','Wellcome to the chat'),users)
socket.broadcast.emit('newUser',generateMessage('admin',`${userName} Joined the Chat`),users)




  socket.on('disconnect', function (userName) {
  users.splice(users.find((user)=>user===userName),1)
  socket.broadcast.emit('newUser',generateMessage('admin',`User${userName} left the Chat`),users)
    })

    socket.on('createMessage', (message,callback)=> {
      io.emit('newMessage',generateMessage(message.from,message.text))
      callback(" Server: message recived");
    })
})

server.listen(port, () => {
  console.log('Server is up and running, Port'+port);
})
