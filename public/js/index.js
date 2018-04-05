var socket = io();
var userName="";

socket.on('connect', () => {
console.log("Connected to server")

})
socket.on('disconnect', (userName) => {
console.log("Disconnected to server")
})
socket.on('newUser',(message,users) => {
  var li = jQuery('<li></li>')
if(userName==="") {userName=users[users.length-1]}
  li.text(`${message.from}: ${message.text}`)
  jQuery('#messages').append(li)
  jQuery('#users').append("You are "+userName+"<br><br>")
  jQuery('#users').append(users.join("<br>"))


})

socket.on('newMessage',(message) => {
  console.log(message.text)
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)
  jQuery('#messages').append(li)

})

jQuery('#message-form').on('submit', function(e) {
e.preventDefault();
socket.emit('createMessage', {
  from: userName,
  text: jQuery('[name=message]').val()

}, function(e) {
jQuery('[name=message]').val('')
})
}
)
