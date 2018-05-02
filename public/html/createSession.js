// Make connection
var socket = io.connect('http://localhost:4001');

function url_redirect(options){
    var $form = $("<form />");
    
    $form.attr("action",options.url);
    $form.attr("method",options.method);
    
    for (var data in options.data)
    $form.append('<input type="hidden" name="'+data+'" value="'+options.data[data]+'" />');
     
    $("body").append($form);
    $form.submit();
}

var btn = document.getElementById('submit');
btn.addEventListener('click', function() {
    console.log('Event Triggered');
    alert('button clicked');
	//console.log(story.value);
	socket.emit('createSession', {
        session:{
        scrum : $('#scrum').val(),
        story : $('#story').val(),
        admin : $('#admin').val(),
        id : Math.floor(Math.random()*10000)
        }
	});
});
// Listen for events
socket.on('openSession', function(data) {
    alert('Inside Open Session'+data.session.story+' '+data.session.id);
    window.location.href = 'http://localhost:4001/ShowCards.html?id='+ data.session.id+
    '&scrum=' + data.session.scrum + '&story=' + data.session.story +'&name=' + data.session.admin;  
    /*url_redirect({url: "/ShowCards/html",
                  method: "post",
                  data: {"scrum":data.scrum}
                 }); */
     

});