var countdown =  $('.countdown-time');
var username = "";

createTimeCicles();
var gameToRegister="";

$(window).on('resize', windowSize);

function windowSize(){
    countdown.TimeCircles().destroy();
    createTimeCicles();
    countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
        countdown.removeClass('animated bounceIn');
    });
}

function createTimeCicles() {
    countdown.addClass('animated bounceIn');
    countdown.TimeCircles({
        fg_width: 0.011,
        bg_width: 0.2,
        circle_bg_color: '#ffffff',
        time: {
                Days: {color: '#a7cb00'}
        ,      Hours: {color: '#a7cb00'}
        ,    Minutes: {color: '#a7cb00'}
        ,    Seconds: {color: '#a7cb00'}
        }
    });
    countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
        countdown.removeClass('animated bounceIn');
    });
}

$(document).ready(function(){
    setTimeout(reloadTweets,1000); //make setInterval
    $(".game").click(getGameDescription);
    $(".check").on('click', sportsClicked);
    function tick(){
    $('#ticker li:first').animate({'opacity':0}, 200, function () { $(this).appendTo($('#ticker')).css('opacity', 1); });
    }
    setInterval(function(){ tick () }, 4000);
});

function sportsClicked(e){
        e.preventDefault();
        $("#modal-day1").modal("hide");
        console.log("in populate function")
        $.ajax({
        url: 'gcapjson.php',
        type: "GET",
        dataType: "json",
        success: function(response){
            response = response.data;
        var tabValue = "";
        for(i = 0;i < response.length; i++){
         var rowValue = ""
         rowValue  += "<td>"+ response[i].date + "</td>" +"<td>"+ response[i].title + "</td>" +"<td>"+ response[i].time + "</td>" +"<td>"+ response[i].compe + "</td>" +"<td>"+ response[i].score + "</td>" + "<td>"  + response[i].result + "</td>" 
         rowValue = "<tr>" + rowValue + "</tr>"
         tabValue += rowValue;
         }
        
         $("#gcapBody").html(tabValue);
     },
     error: function(A,B,C){
        console.log(A);
        console.log(B);
        console.log(C);
        alert("error");
     },
     cache:false
     });
}

function getGameDescription() {
  var gamename = $(this).attr("data-name");
  $.ajax({
        url: "http://localhost:8000/api/game",
        dataType: "json",
        method: "GET",
        data: {
            gamename: gamename
        },
        beforeSend: function() {
            
        },
        cache: false,
        success: showGameDescription,
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function showGameDescription(data) {
  data = data[0];
  data.gamename = "badminton";
  var modalContentWrapper = $("#modal-skeleton .modal-main-content");
  modalContentWrapper.html('<div class="row event-heading">\
                    <div class="col-md-12"><h2>'+data.gamename+'</h2></div>\
                </div>\
                <div class="row">\
                     <div class="col-md-2"></div>\
                     <div class="col-md-4"><div class="polaroid"><img src="'+data.imagepath+'" class="img-responsive" /></div></div>\
                     <div class="col-md-4">'+data.description+
                    '<div class="button-wrapper row">\
                        <div class="col-md-6"><button type="button" class="btn btn-default btn-success register" data-name="'+data.gamename+'"><span class="glyphicon glyphicon-plus"></span> Register</button></div>\
                        <div class="col-md-6"><button type="button" class="btn btn-default btn-success rule"><span class="glyphicon glyphicon-circle-arrow-down"></span> Rules</button></div>\
                         <div class="row single" style="display:none;">\
                               <div class="col-md-12"><input type="checkbox" id="single-register" checked/>Register for singles</div>\
                          </div>\
                          <div class="row team" style="display:none;">\
                               <div class="col-md-12"><input type="text" id="team" class="form-control" placeholder="team mate email id"/></div>\
                          </div>\
                    </div>\
                    </div>\
                    <div class="col-md-2"></div>\
                </div>\
               ');
  $(".rule").click(function(){
    window.location = data.rules;
  });
  data.gamename = data.gamename.toLowerCase();
  if (data.gamename == "tabletennis" || data.gamename == "badminton") {
    $(".single").css("display","inline");
  }
  if (data.gamename == "foosball" || data.gamename == "carrom") {
    $(".team").css("display","block");
  }
  $("#single-register").click(function () {
    if ($(this).prop("checked")) {
       $(".team").css("display","none");
    } else {
       $(".team").css("display","block");
    }
  })
  $(".register").click(registerEvent);
  $("#modal-skeleton").modal('show');
}

function registerEvent() {
   var gamename = $(this).attr("data-name"); 
   if ( ((gamename == "tabletennis" || gamename == "badminton") && $("#single-register").prop("checked")) ) {
        gamename = gamename+"-single";
   }
   if (!authenticate()) {
      showLoginSignUpModal();
      gameToRegister = gamename;
   } else {
      register(gamename);
   }
}

function register(game) {
  // if (!authenticate()) {
  //   return false;
  // }
  var players = username;
  if (game == "foosball" || game == "carrom" || game == "tabletennis" || game == "badminton") {
    if (!validateEmail($("#team").val())) {
      alert("Enter valid email Address");
      return false;
    } else {
      players += $("#team").val();
    }
  }


  $.ajax({
        url: "api/registerEvent.json",
        dataType: "json",
        data:{"eventname":game,"players":players},
        method: "POST",
        beforeSend: function() {
            
        },
        cache: false,
        success:showRegisterResponse,
        error: function(jqXHR, textStatus, errorThrown) {}
  });
}

function showRegisterResponse (data) {
  var response = "";
  if (data.success) {
    response = "Registered successfully.";
  } else {
    response = "Registration failed."
  }
  $("#modal-skeleton").modal("show");
    var modalContentWrapper = $("#modal-skeleton .modal-main-content");
    modalContentWrapper.fadeOut("fast",function() {
      modalContentWrapper.html("<h2 style='text-align:center; margin-top:20px'>"+response+"</h2>");
      modalContentWrapper.fadeIn("fast");
    });

}


function showLoginSignUpModal () {
  //$("#modal-skeleton").modal("hide");
  $("#modal-skeleton").modal("show");
  var modalContentWrapper = $("#modal-skeleton .modal-main-content");
  modalContentWrapper.fadeOut("fast",function() {
    modalContentWrapper.html($("#loginSignUpModal").html());
    $("#signup").click(signup);   
    $("#login").click(login);
    modalContentWrapper.fadeIn("fast");
  });
}

function login () {
  var password = $("#login_password").val();
  var login = $("#login_email").val().toLowerCase();
  if (password.length == 0 || login.length == 0) {
    alert("Enter username & password");
    return false;
  }
  $.ajax({
        url: "http://localhost:8000/api/login",
        dataType: "json",
        method: "GET",
        data: {
            username: login,
            password:password,
        },
        beforeSend: function() {
            
        },
        cache: false,
        success:showLoginResponse,
        error: function(jqXHR, textStatus, errorThrown) {}
  });
  return false;
}

function showLoginResponse (data) {
  var response = "";
  if (gameToRegister!="") {
    register(gameToRegister);
    return false;
  }
  if (data.success) {
    response = "Logged in successfully.";
  } 
  $("#modal-skeleton").modal("show");
    var modalContentWrapper = $("#modal-skeleton .modal-main-content");
    modalContentWrapper.fadeOut("fast",function() {
      modalContentWrapper.html("<h2 style='text-align:center; margin-top:20px'>"+response+"</h2>");
      modalContentWrapper.fadeIn("fast");
  });

}

function signup() {
  gameToRegister = "";
  var name = $("#name").val();
  var floornumber = $("#floornumber").val();
  var cubenumber = $("#cubenumber").val();
  var mobnumber = $("#mobnumber").val();
  var password = $("#password").val();
  var email = $("#email").val().toLowerCase();

  if (name.length == 0) {
    alert("Enter full name");
    return false;
  }
  if (password.length == 0) {
    alert("Enter password");
    return false;
  }
  if (floornumber.length == 0 || floornumber*-1 != -floornumber) {
    alert("Enter valid floor number");
    return false;
  }
  if (cubenumber.length == 0) {
    alert("Enter cube number");
    return false;
  }
  if (email.length == 0 || !validateEmail(email)) {
    alert("Enter a valid paypal.com or ebay.com email address");
    return false;
  }
  if (mobnumber.length != 10 || mobnumber*-1 != -mobnumber) {
    alert("Enter a valid ten digit mobile number");
    return false;
  }

  $.ajax({
        url: "http://localhost:8000/api/signup/new",
        dataType: "json",
        method: "GET",
        data: {
            emailid: email,
            username:name,
            floorno:floornumber,
            cubeno:cubenumber,
            mobileno:mobnumber,
            password:password
        },
        beforeSend: function() {
            
        },
        cache: false,
        success:showSignUpResponse,
        error: function(jqXHR, textStatus, errorThrown) {}
  });

  return false; 
}

function showSignUpResponse(data) {
  var response;
  if (data.success) {
    response = "Please verify your email address to complete the signup process.";
  } else {
    response = "Error signup.";
  }

  $("#modal-skeleton").modal("show");
    var modalContentWrapper = $("#modal-skeleton .modal-main-content");
    modalContentWrapper.fadeOut("fast",function() {
      modalContentWrapper.html("<h2 style='text-align:center; margin-top:20px'>"+response+"</h2>");
      $("#signup").click(signup);   
      modalContentWrapper.fadeIn("fast");
    });
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))(@paypal.com|@ebay.com)$/;
    return re.test(email);
} 

function authenticate() {
  var authenticated = false;
  $.ajax({
        url: "http://localhost:8000/api/currentuser",
        dataType: "json",
        method: "GET",
        async:false,
        beforeSend: function() {
            
        },
        cache: false,
        success:function(data) {
          if (data === null) {
            authenticated = false;
          } else {
            authenticated = true;
            username = data.emailid;
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
  return authenticated;
}

function reloadTweets() {
    twitterFetcher.fetch('492945069154906112', '', 2, true, true, true, '', false, handleTweets);
}

function handleTweets(tweets){
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById('twitter');
      var html = '<ul>';
      while(n < x) {
        html += '<li>' + tweets[n] + '</li>';
        n++;
      }
      html += '</ul>';
      element.innerHTML = html;
}
