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

var btn = document.getElementById('createButton');
btn.addEventListener('click', function() {
    console.log('Event Triggered');
    alert('button clicked');
	//console.log(story.value);
    socket.emit('createSession', {
        session:{
            scrum : $('#scrum').val(),
            story : $('#story').val(),
            status : "progress",
            iteration: {
                id : $('#id').val(),
                count: 0,
                member: {
                    name:$('#member').val(),
                    role: "SM",
                    status: "progress",
                    point: "0"
                }
            }
        }
    });
});

// Listen for events
socket.on('openSession', function(data) {
    alert('Inside Open Session'+data.session.story+' '+data.session.iteration.count);
    window.location.href = 'http://localhost:4001/ShowCards.html?id='+ data.session.iteration.id+
    '&scrum=' + data.session.scrum + '&story=' + data.session.story +'&name=' + 
    data.session.iteration.member.name + '&count=' + data.session.iteration.count;  
    /*url_redirect({url: "/ShowCards/html",
                  method: "post",
                  data: {"scrum":data.scrum}
                 }); */
     

});

//Get value of query param
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
};



//Trigger event for Join session
/*var btn = document.getElementById('joinButton');
btn.addEventListener('click', function() {
    console.log('Event Triggered');
    alert('button clicked');
	//console.log(story.value);
	socket.emit('joinSession', {
        session:{
            scrum : $('#scrum').val(),
            story : $('#story').val(),
            status : "progress",
            iteration: {
                id : $('#id').val(),
                count: data.session.iteration.count,
                member: {
                    name:$('#member').val(),
                    role: "TM",
                    status: "progress",
                    point: "0"
                }
            }
        }
    });
});*/



// Listen for join session events
/*socket.on('addUser', function(data) {
    alert('Inside Open Session'+data.session.story+' '+data.session.iteration.id);
    window.location.href = 'http://localhost:4001/ShowCards.html?id='+ data.session.iteration.id+
    '&scrum=' + data.session.scrum + '&story=' + data.session.story +'&name=' + 
    data.session.iteration.member.name+ '&count=' + data.session.iteration.count;  
    /*url_redirect({url: "/ShowCards/html",
                  method: "post",
                  data: {"scrum":data.scrum}
                 }); */
     

//});