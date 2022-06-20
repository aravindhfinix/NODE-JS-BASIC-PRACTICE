var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){

  //send the index.html file for all requests
  res.sendFile(__dirname + '/index.html');

});

//client connection to the server
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect',()=>{
    console.log('user disconnected')
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

});

http.listen(3001, function(){

  console.log('listening on 3001.....');

});
