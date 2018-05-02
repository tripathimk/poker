var express = require('express');
var socket = require('socket.io');
var path = require('path');

// App setup
var app = express();
var server = app.listen(4001, function(){
    console.log('listening for requests on port 4001,');
});

// Static files
app.use(express.static('public'));
app.use(express.static('public/css'));
app.use(express.static('public/html'));
app.use(express.static('public/js'));

// app.use(express.static(path.join(__dirname, 'public')));

// Socket setup & pass server
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    socket.on('createSession', function(data){
        console.log("link emitted");
        io.sockets.emit('openSession', data);
        
   }); 
  });