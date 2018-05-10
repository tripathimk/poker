// Make connection
var socket = io.connect('http://localhost:4001');
var sessionID;


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




$(document).ready(function(){
        $('#estmtBtn').click(function() {
        alert('Vote Click button triggered');
        sessionID=$('#id').val();
        socket.emit('submitEstimate', {
            "sessions" : 
            [
              {
                "id" : $('#id').val(), 
                "scrum" : $('#scrum').val() ,
                "story" : $('#story').val(),
                "status" : "progress",
                "iterations" :
                [
                 { 
                   "id": 1,
                   "count": 0, 
                   "status": "progress",
                   "members" :
                   [
                     { 
                       "name":$('#member').val(),
                       "role": "SM",
                       "status": "complete",
                       "point": $('#number').val()
                      }
                    ]
                  }
                ]
              }
            ]}
         )
    })
});


socket.on('showEstimate', function(data) {
    alert('Inside Open Session'+data.sessions[0].story+' '+data.sessions[0].iterations[0].members[0].name); 
    var sessionData = filterdata(data);
    if (typeof sessionData !== "undefined" && sessionData !== null) 
    {
        createTable(sessionData);
    }
    
//console.log("showEstimate event caught");   
});

//function to filter data to get session applicable for client
function filterdata(data)
{
    var myJson = JSON.stringify(data);
    var json = JSON.parse(myJson);	
    alert('json'+json);
    var mySession;
    for (var i = 0; i < json.sessions.length; i++) 
    {  
        if(json.sessions[i].id == sessionID)
        {
            mySession = json.sessions[i];
        }
    }
    return mySession;
}



//Function to display list of users who have submitted estimate
function createTable(data){
    $('#showCards').hide();
    $('#showPoints').css('display', 'inline-block');
    mytable = $('<table></table>').attr({ id: "basicTable" });
    var rows = new Number($("#rowcount").val());
    var cols = new Number($("#columncount").val());
    var tr = [];
    for (var i = 0; i < 1; i++) {
        var row = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
        for (var j = 0; j < 1; j++) {
            $('<td></td>').append(
                "<div class='card bg-info text-white' "+
                "style='width:150px;height:200px'>"+
                "<div class='card-body'>"+
                "<h4 class='card-title'>"+ data.iterations[0].members[0].point+"</h4>"+
                "<p class='card-text'>"+ data.iterations[0].members[0].name +"</p></div></div>").appendTo(row); 
        }                          
    }
    console.log("TTTTT:"+mytable.html());
    mytable.appendTo("#showPoints");	                
}


//Function to get number when click on cards

$(document).ready(function(){
    $(".card-body").each( function() 
    {
        $(this).click(function() {
            var attribute = this.getAttribute("value");
            number.value = attribute;
            alert(number.value);
        })
    })
});
