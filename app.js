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

var count = 0;

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    //Event Listener for First Session creation
    socket.on('createSession', function(data){
        console.log("Session Creation request "+data.session.iteration.count);
        data.session.iteration.count = count + 1;
        count = data.session.iteration.count;
        console.log("count "+ count);
        io.sockets.emit('openSession', data);
    }); 
    //Event Listener for Join Session 
    /*socket.on('joinSession', function(data){
        console.log("Session join reques");
        io.sockets.emit('addUser', data);
    });*/
});