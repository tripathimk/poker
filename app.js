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
function getConnectedList ()
{
    let list = []

    for ( let client in io.sockets.connected )
    {
        list.push(client)
    }

    return list
}



io.on('connection', (socket) => {
    console.log('made socket connection-->');
    console.log( getConnectedList() );
    //Event Listener for First Session creation
    socket.on('createSession', function(data){
        console.log("Session Creation request "+data.session.iteration.count);
        data.session.iteration.count = count + 1;
        count = data.session.iteration.count;
        console.log("count "+ count);
        io.sockets.emit('openSession', data);
    }); 
    //Event Listener for Join Session 
    socket.on('submitEstimate', function(data){
        console.log("Caught submit estimate event");
        console.log("Name:"+ data.session.iteration.member.name);
        console.log("Estimate:"+data.session.iteration.member.point);
        io.sockets.emit('showEstimate', data);
    });
});