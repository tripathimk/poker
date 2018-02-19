var socket = io.connect('http://localhost:4001');
var querystring = require('querystring');



var scrum = document.getElementById('scrum'),
story = document.getElementById('story')
  btn = document.getElementById('submit'),
  output = document.getElementById('output');

socket.on('estimate', function(data){
	console.log(data);
    output.innerHTML += 'MY Values';
});