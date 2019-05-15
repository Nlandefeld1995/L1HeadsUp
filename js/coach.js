var myDataRef = new Firebase('https://{}.firebaseio.com/');
              
                        // time stamp function
                        function timeStamp(){
                          var d = new Date();
                          return d.toJSON();
                        }
              
                        // jQuery Magicz
                        $('document').ready(function() {
                          // make sure only numbers in case_num_txt
                          $('#case_num_txt').keydown(function (e) {
                            // Allow: backspace, delete, tab, escape, enter and .
                            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                              // Allow: Ctrl+A, Command+A
                              (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
                              // Allow: Ctrl+C, Command+C
                              (e.keyCode == 67 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
                              // Allow: Ctrl+V, Command+V
                              (e.keyCode == 86 && ( e.ctrlKey === true || e.metaKey === true ) ) ||  
                              // Allow: home, end, left, right, down, up
                              (e.keyCode >= 35 && e.keyCode <= 40)) {
                                // let it happen, don't do anything
                                return;
                              }
                            // Ensure that it is a number and stop the keypress
                            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                              e.preventDefault();
                            }
                          });
              
                          // submit button clicked, validate fields, push to Firebase
                          $('#submit_btn').click(function() {
                            // get employeeName
                            var employeeName = (domo.env.userName == undefined) ? "someone?" : domo.env.userName.replace("+", " ");
                            // get caseNum
                            var caseNum = $('#case_num_txt').val();
                            // get category
                            var category = $('#category').val();
                            // get description
                            var description = $('#description_txt').val();
                            // get priority
                            var priority = $("#priority").val();
                            // variable to determine validation of form
                            var formComplete = true;
              
                            // validate caseNum length equals 8
                            if(caseNum.length != 8) {
                              $('#case_num_txt').css({'background-color':'#ffb3b3'});
                              formComplete = false;
                            } else {
                              $('#case_num_txt').css({'background-color':'white'});
                            }
              
                            // validate description is more than two words... come on here!
                            if(description.length < 10) {
                              $('#description_txt').css({'background-color':'#ffb3b3'});
                              formComplete = false;
                            } else {
                              $('#description_txt').css({'background-color':'white'});
                            }
              
                            // determine priorityNum 
                            switch(priority) {
                              case "Phone":
                                var priorityNum = 1;
                                break;
                              case "Prod":
                                var priorityNum = 2;
                                break;
                              case "High":
                                var priorityNum = 3;
                                break;
                              case "Med":
                                var priorityNum = 4;
                                break;
                              default:
                                var priorityNum = 5;
                            }
              
                            // push data to firebase if formComplete
                            if(formComplete == true) {
                              var postsRef = myDataRef;
              
                              var newPostRef = postsRef.push();
              
                              newPostRef.set({
                                Employee_Name: employeeName,
                                Case_Number: caseNum,
                                Category: category,
                                Description: description,
                                Priority: priority,
                                Priority_Num: priorityNum,
                                Time_Request: timeStamp()
                              });
              
                              // bring in curtain div
                              $('#curtain').fadeIn(1000);
                            }
                          });
              
                          // submit_complete_btn clicked clear text boxes
                          $('#submit_complete_btn').click(function() {
                            $('#case_num_txt').val("");
                            $('#description_txt').val("");
                            $('#curtain').fadeOut(1000);
                          })
                        });




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var myDataRef = new Firebase('https://{}.firebaseio.com/');
// create object to contain queue of request
var queue = [];

// time stamp function
function timeStamp(){
  var d = new Date();
  return d.toJSON();
};

// format employeeName for visual
function formatEmployeeName(_employeeName) {
  _employeeName = _employeeName.split(" ");
  return _employeeName[0] + " " + _employeeName[1].charAt(0) + ".";
};

// format timeRequest for visual
function formatWaitTime(_timeRequest) {
  var now = new Date();
  var _timeRequest = new Date(_timeRequest);

  var sec = (now - _timeRequest) / 1000;

  // check if waiting for an hour...minute...sec...
  if(sec / 3600 >= 1) {
    return (Math.floor(sec / 3600)) + "h\n" + (Math.floor((sec % 3600) / 60)) + " m\n";
  } else if(sec / 60 >= 1) {
    return (Math.floor(sec / 60)) + "m\n";
  } else {
    return ("0m\n" + Math.floor(sec) + "s");
  }
};

// format caseNum to include hyperlink to salesforce
function getCaseNumHyperLink(_caseNum, _key) {
  // pull in DOMO dataset
  $.ajax({
    async: false,
    type: 'GET',
    url: '/data/v1/Case_ID?fields=id,caseNumber&filter=caseNumber=' + _caseNum,
    success: function(json) {
      queue[_key].hyperlink = (json[0]) ? json[0].id : undefined;
    }
  });
};
var buttonintable = '';
// iterate through queue object and create necessary td
function queueToList() {
  // clear table
  var employeeName1 = (domo.env.userName == undefined) ? "someone?" : domo.env.userName.replace("+", " ");
  $('#queue_table').find("tr:gt(0)").remove();

  $.each(queue, function(key, value) {
    // update hyperlink
    getCaseNumHyperLink(value.caseNum, key);
    if(value.employeeName == employeeName1){
      buttonintable = '<button id="' + value.request + '_comp' + key + '"class="comp_btn">DONE</button>'
    }
    else{
      buttonintable =  '<a></a>'
    }
    $('#queue_table > tbody:last').after('<tr><td class="' + value.priority + '">' + value.priority +
              '</td><td id="' + key + '" class="time_request">' + value.timeRequest +
              '</td><td>' + formatEmployeeName(value.employeeName) + 
              '</td><td><a href="https://domo.my.salesforce.com/' + value.hyperlink + '" target="_blank">' + value.category + "\n" + value.caseNum + '</a>' +
              '</td><td>' + '<textarea readonly class="description_text">' + value.description + '</textarea></td><td>' + 
              buttonintable
              
              
    );
  });
};

// iterate through each member of time_request class update timer
function updateTime() {
  $('.time_request').each(function() {
    var key = $( this ).attr('id');

    var _timeRequest = queue[key].timeRequest;

    $( this ).html(formatWaitTime(_timeRequest));
  });
}

// jQuery Magicz
$('document').ready(function() {
  // FIRST LOAD UPDATE
  // on load create queue object
  myDataRef.orderByChild("Priority_Num").on("value", function(data) {
    // clear queue in preperation for new load from firebase
    queue = []; 

data.forEach(function(snapshot) {
  var request = snapshot.key();

  queue.push({
    "request": request,
    "employeeName": snapshot.val().Employee_Name,
              "caseNum": snapshot.val().Case_Number,
              "category": snapshot.val().Category,
              "description": snapshot.val().Description,
              "priority": snapshot.val().Priority,
              "timeRequest": snapshot.val().Time_Request,
              "hyperlink": undefined
  });
});

// reverse queue
queue = queue.reverse();

// make queue object visual
queueToList();

// make time accurate
updateTime();
});

  // complete button is clicked
  $('#queue_table').on('click',".comp_btn", function() {
    var key = this.id;
    key = key.split("_comp");
    var firebaseKey = key[0];
    var queueKey = key[1];

    // commit data to google sheets
    request = $.ajax({
    url: "https://script.google.com/macros/s/-K8/exec",
    data: {
        Employee_Name: queue[queueKey].employeeName,
        Case_Number: queue[queueKey].caseNum,
        Category: queue[queueKey].category,
        Description: queue[queueKey].description,
        Priority: queue[queueKey].priority,
        Time_Request: queue[queueKey].timeRequest,
        Time_Complete: timeStamp(),
        Coach: (domo.env.userName == undefined) ? "someone?" : domo.env.userName.replace("+", " ")
      },
    error: function() {
      console.log("Error failed to post to Google");
    },	
    dataType: 'json',
    success: function(data) {
      console.log("Success posting to Google");
    },
    type: "post"
  });

  // remove by key from firebase
  myDataRef.child(firebaseKey).remove();
  });

  // update time every 5 secs
  window.setInterval(function() {
    updateTime();
  }, 5000)
});