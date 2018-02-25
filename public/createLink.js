// Make connection
var socket = io.connect('http://localhost:4000');

var scrum = document.getElementById('scrum'), story = document
		.getElementById('story')
btn = document.getElementById('submit'), output = document
		.getElementById('output');

btn.addEventListener('click', function() {
	console.log(scrum.value);
	console.log(story.value);
	socket.emit('createLink', {
		scrum : scrum.value,
		story : story.value
	});
});

// Listen for events
socket.on('link', function(data) {
	console.log('Inside inner HTML');
	output.innerHTML += '<p><strong>http://localhost:4000/' + data.scrum + '/'
			+ data.story + '</p>';
	/* socket.emit('estimate', {
	      scrum: scrum.value,
	      story: story.value
	  });*/
	window.location.href = 'http://localhost:4000/estimate.html?scrum='
			+ data.scrum + '&story=' + data.story;

});
