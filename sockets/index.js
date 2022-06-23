const { isIPv4 } = require('net');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){

//send the index.html file for all requests
  res.sendFile(__dirname + '/index.html');

});

//client connection to the server
io.on('connection', (socket,userID) => {
  userID=Math.floor(Math.random() * 10000)
  console.log('an user connected as ' +userID);
  socket.on('disconnect',()=>{
    console.log('user disconnected ' +userID)
  })
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg,userID);
    console.log(userID +":"+ msg)
  });

});

http.listen(3001, function(){

  console.log('listening on 3001.....');

});
