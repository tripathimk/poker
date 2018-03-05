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
        var scrum =data.scrum; 
        if(scrum in dataList)
        	{
        	var users=dataList[scrum]; 
        	console.log('users',users);
        	var recordExists = false;
        	for (var i = 0; i < users.length; i++) {
        		console.log('users[i]',users[i]);
        		console.log('users[i].member',users[i]["member"]);
				if(data.member == users[i]["member"])
					{
					console.log("existing user");
					user = users[i];
					user["number"]=data.number;
					recordExists =true;
					}
			}
        	console.log('recordExists:',recordExists);
        	if(!recordExists)
        		{
        		console.log("new user");
        		var newUser={};
        		newUser["member"]=data.member;
        		newUser["number"]=data.number;
	         	users.push(newUser); 
        		}       
        	}
        else
        	{
        	var users=[];
        	var user={};
        	user["member"]=data.member;
        	user["number"]=data.number;
        	users.push(user);  
        dataList[scrum]=users;      	
        	}  
        console.log(dataList);
        io.sockets.emit('estimate', {scrum,dataList});
        console.log("estimate emitted");
   }); 
});