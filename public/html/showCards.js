// Make connection
var socket = io.connect('http://localhost:4001');


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


jQuery(document).ready(function(){
    var btn = document.getElementById('submit');
    btn.addEventListener('click', function() {
        console.log('estimate Event Triggered');
        alert('Click button triggered');
        //console.log(story.value);
        socket.emit('submitEstimate', {
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
    })

    
    socket.on('showEstimate', function(data) {
        alert('Inside Open Session'+data.session.story+' '+data.session.iteration.member.name);
        createTable();
        console.log("showEstimate event caught");   
    });




function createTable(){
    alert('submitted estimate');
    $('#showCards').hide();
    $('#showPoints').css('display', 'inline-block');
    mytable = $('<table></table>').attr({ id: "basicTable" });
    var rows = new Number($("#rowcount").val());
    var cols = new Number($("#columncount").val());
    var tr = [];
    for (var i = 0; i < 3; i++) {
        var row = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
        for (var j = 0; j < 3; j++) {
            $('<td></td>').append(
                "<div class='card bg-info text-white' style='width:150px;height:200px'><div class='card-body'><h4 class='card-title'>Card title</h4><p class='card-text'>Manoj</p></div></div>").appendTo(row); 
        }                          
    }
    console.log("TTTTT:"+mytable.html());
    mytable.appendTo("#showPoints");	                
}