var express = require('express');
var socket = require('socket.io');
var path = require('path');

var dataList={};

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// Socket setup & pass server
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    // Handle chat event
    socket.on('createLink', function(data){
         console.log(data);
         io.sockets.emit('link', data);
         console.log("link emitted");
    });    
  socket.on('showData', function(data){
        console.log(data);
        console.log('users',users);
        var scrum =data.scrum; 
        if(scrum in dataList)
        	{
        	var users=dataList[scrum];       	
        	users.push(data.member);  
        //dataList[scrum]=users; not required
        	}
        else
        	{
        	var users=[];
        	users.push(data.member);  
         dataList[scrum]=users;      	
        	}       
        io.sockets.emit('estimate', {scrum,dataList});
        console.log("estimate emitted");
   }); 
});