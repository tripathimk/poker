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

//Declare global variable
var globalData;
var count = 0;


function getConnectedList ()
{
    let list = []

    for ( let client in io.sockets.connected )
    {
        list.push(client)
    }
    return list;
}



io.on('connection', (socket) => {
    console.log('made socket connection-->');
    console.log( getConnectedList() );
    //Event Listener for First Session creation
    socket.on('createSession', function(data){
        console.log("Session Creation request ");
        addSessionDatatoList(data);
       // data.session.iteration.count = count + 1;
       // count = data.session.iteration.count;
        //console.log("count "+ count);
        io.sockets.emit('openSession', data);
    }); 
    //Event Listener for Join Session 
    socket.on('submitEstimate', function(data){
        console.log("Caught submit estimate event");
        addMemberDatatoList(data);
        //console.log("Name:"+ data.session.iteration.member.name);
       // console.log("Estimate:"+data.session.iteration.member.point);
        io.sockets.emit('showEstimate', globalData);
    });
});

//JSOn manuplation -->Add data to global variable

//add data of newly created sessions on same socket
function addSessionDatatoList(data)
{
    var isNewSession = true;
    //first netry in global data
    if (typeof globalData == "undefined" || globalData == null) 
    {
        console.log('inside if global data is null');
        globalData = data;
    }
    else 
    {
        console.log('inside else');
        for (var i = 0; i < globalData.sessions.length; i++)
        {
            if(globalData.sessions[i].id == data.sessions[0].id)
            {
                console.log('Existing session');
                //globalData.sessions[i].iterations[0].members.push(data.sessions[0].iterations[0].members[0]);
                isNewSession = false;
            }
        }
        if(isNewSession)
        {
            console.log('new session');
            globalData.sessions.push(data.sessions[0]);
        }
    }
    console.log('global data-->'+globalData);
}

//add data of newly joined member in exiting session
function addMemberDatatoList(data)
{   
    console.log('initial Member count-->'+data.sessions[0].iterations[0].members.length);
    for (var i = 0; i < globalData.sessions.length; i++)
    {
        if(globalData.sessions[i].id == data.sessions[0].id)
        {
            console.log('session id found:'+ data.sessions[0].id);
            globalData.sessions[i].iterations[0].members.push(data.sessions[0].iterations[0].members[0]);
            console.log('final member count :' +globalData.sessions[i].iterations[0].members.length);
        }
    }     
}