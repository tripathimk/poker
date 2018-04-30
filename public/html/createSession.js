// Make connection
var socket = io.connect('http://localhost:4001');


var btn = document.getElementById('submit');
btn.addEventListener('click', function() {
    console.log('Event Triggered');
    alert('button clicked');
	//console.log(story.value);
	socket.emit('createSession', {
		//scrum : scrum.value,
        //story : story.value
	});
});

// Listen for events
socket.on('openSession', function(data) {
    console.log('Inside inner HTML');
    alert('Inside Open Session');
	window.location.href = 'http://localhost:4001/ShowCards.html';

});
