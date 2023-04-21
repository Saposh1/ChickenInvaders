import ChickenEnemy from "./ChickenEnemy.js";
import Player from "./Player.js";
import BulletController from "./bulletController.js";
// classes
class User {
    constructor(first_name, last_name, username, password, email, dateOfBirth) {
      this.first_name = first_name;
      this.last_name=last_name;
      this.username = username;
      this.password = password;
      this.email = email;
      this.dateOfBirth = dateOfBirth;
    }
  }

// ---------- on html load DO ------------------//
$("#sigging_div").hide(); 
$("#logging_div").hide(); 
$("#logout-btn").hide();
$("#theCanvas").hide();
$("#lives").hide();
$("#settings_div").hide();
$("#newGame-btn").hide();
$("#table").hide();
$("#scoreTableBody").hide();
$("#scores-btn").hide();



// JavaScript to show/hide the About Dialog
document.getElementById('about_a').addEventListener('click', function() {
  $("#about-dialog").show();
  document.addEventListener('keydown', function(e) {
    if (e.key == 'Escape') {
      $("#about-dialog").hide();
    }
});});
document.addEventListener('click', function (e) {
  const modal = document.getElementById("about-dialog");
  if (e.target=== modal) {
    $("#about-dialog").hide();
  }
});
document.getElementById('close-btn').addEventListener('click', function() {
  document.getElementById('about-dialog').style.display = 'none';
});
document.getElementById('logging_a').addEventListener('click',function() {
  $("#content").hide();
  $("#sigging_div").hide(); 
  $("#logging_div").show();
});  
document.getElementById('welcome').addEventListener('click',function() {
  $("#content").show();
  $("#sigging_div").hide(); 
  $("#logging_div").hide();
}); 
document.getElementById('signning_a').addEventListener('click',function() {
  $("#content").hide();
  $("#logging_div").hide(); 
  $("#sigging_div").show();
}); 
document.getElementById( "game_a" ).addEventListener( 
  "click", newGame, false );

  /* Game Variables */
const canvas = document.getElementById("theCanvas");
const ctx = canvas.getContext("2d");

canvas.width=1000;
canvas.height=700;

const playerBulletController = new BulletController(canvas,10,"media/photos/shoot.png",true);
const enemyBulletController= new BulletController(canvas,4,"media/photos/egg.png",false);
var enemyChicken;
const player = new Player(canvas,15,playerBulletController);
const explodeSound = new Audio("media/sounds/sounds_explosion.wav");
explodeSound.volume = 0.3;
const live=new Image();
const gameOverSound = new Audio("media/sounds/gameover.ogg");
const mainGameSound = new Audio("media/sounds/gameSound.mp3");
mainGameSound.volume=0.3;
gameOverSound.volume = 0.3;
live.src="media/photos/lives.webp";
var livesNum=3;
var i=0;
var spaceship;
let key;
let isGameOver = false;
let didWin = false;
let keyError=true;
let usernameValue;
let passwordValue;
let points=0;
var bgImage;
	// Hero image
var spaceshipImage;

// variables for the game loop and tracking statistics
var intervalTimer; // holds interval timer
var timerCount; // number of times the timer fired since the last second
var timeLeft; // the amount of time left in seconds
var timeElapsed; // the number of seconds elapsed
var TIME_INTERVAL = 25;
var userTime;


// buttons 
const btn_signUp = document.getElementById("signup-btn");
const btn_login = document.getElementById("login-btn");
const btn_submit = document.getElementById("btn_submit");
const btn_checkLogin = document.getElementById("checkLogin-btn");
const btn_logout = document.getElementById("logout-btn");
const btn_newGame = document.getElementById("newGame-btn");


// DB
var users = {};
var playerScores=[];
users["p"] = new User("Tester", null, null, "testuser", null ,null);
let currUser = null;

/* --------------------------------------------  Logout ----------------------------------------- */
$("#logout-btn").click(function (e) {
  if(currUser){
    currUser=null;
    playerScores=[];
    e.preventDefault();
    $("#sigging_div").hide(); 
    $("#logging_div").hide(); 
    $("#logout-btn").hide();
    $("#theCanvas").hide();
    $("#lives").hide();
    $("#settings_div").hide();
    $("#table").hide();
    $("#scoreTableBody").hide();
    $("#newGame-btn").hide();
    $("#bar").show();
    $("#logo").show();
    $("#top_photo").show();
    $("#content").show();

  }})
/* --------------------------------------------  Game functionality ----------------------------------------- */

// set up interval timer to update game
function startTimer()
{
   intervalTimer = window.setInterval( game, TIME_INTERVAL );
} // end function startTimer

// terminate interval timer
function stopTimer()
{
   window.clearInterval( intervalTimer );
} // end function stopTimer


// called when the app first launches
function setupGame()
{
   // stop timer if document unload event occurs
   document.addEventListener( "unload", stopTimer, false );
   // start a new game when user clicks Start Game button
	 bgImage = new Image();
	 bgImage.src = "media\\photos\\backGround.webp";
   spaceshipImage = new Image();
   spaceshipImage.src = "media\\photos\\spaceship1.png";
   spaceshipImage.height ="20";
   spaceshipImage.width ="20";
   spaceship = {speed: 1500 }; // movement in pixels per second
   timerCount = 0; // the timer has fired 0 times so far
}

function game(){
    btn_newGame.addEventListener("click",settings);
    btn_logout.addEventListener("click",endGame);
    checkGameOver();
    ctx.drawImage(bgImage,0,0,canvas.width,canvas.height);
    displayGameOver();
    if(!isGameOver){
      enemyChicken.draw(ctx);
      player.draw(ctx);
      var j=30;
      for(i=0;i<livesNum;i++){
        ctx.drawImage(live,10+j,10,30,30);
        j+=30;
      }
      if(timeElapsed===5||timeElapsed===10||timeElapsed===15||timeElapsed===20){
        enemyChicken.defaultXVelocity*=1.015;
      }
     // display time remaining
     ctx.fillStyle = "red";
     ctx.font = "bold 30px calibri";
     ctx.textBaseline = "top";
     ctx.fillText("Time remaining: " + timeLeft, 180, 10);
     ++timerCount; // increment the timer event counter

     // if one second has passed
     if (TIME_INTERVAL * timerCount >= 1000)
     {
        --timeLeft; // decrement the timer
        ++timeElapsed; // increment the time elapsed
        timerCount = 0; // reset the count
        if(timeLeft==0){
          isGameOver = true;
        }
     } // end if
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    }
}

// Function to populate the table with player scores
function populateScoreTable() {
  var tableBody = document.getElementById('scoreTableBody');
  tableBody.innerHTML = ''; // Clear table body

  // Loop through the player scores and create a table row for each player
  for (var idx = 0; idx < playerScores.length; idx++) {
    var date = playerScores[idx].date;
    var score = playerScores[idx].score;

    // Create a new row in the table
    var row = document.createElement('tr');

    // Create table cells for player and score, and add them to the row
    var playerCell = document.createElement('td');
    playerCell.textContent = date;
    row.appendChild(playerCell);

    var scoreCell = document.createElement('td');
    scoreCell.textContent = score;
    row.appendChild(scoreCell);

    // Add the row to the table body
    tableBody.appendChild(row);
  }
}


function displayGameOver() {
  if (isGameOver) {
    stopTimer();
    mainGameSound.pause();
    points=enemyChicken.howManyPoint();
    let text;
    if(livesNum==0){
      text="You Lost! Your Score: "+points;
    }
    else if(points>=250){
      text="Champion! Your Score: "+points;
    }
    else if(points>=100 && point<250){
      text="Winner! Your Score: "+points;
    }
    else {
      text="You Can Do Better! Your Score: "+points;
    }
    var curDate=new Date();
    playerScores.push({date:curDate,score:points})
    gameOverSound.play();
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(text, 300, canvas.height / 2);
    $("#scores-btn").show();
    $("#table").show();
    $("#scoreTableBody").show();
    populateScoreTable();
    document.getElementById("scores-btn").addEventListener('click',function(){
      $("#theCanvas").hide();
      $("#scores-btn").hide();
  })
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    livesNum-=1;
    explodeSound.play();
    player.x=canvas.width/2;
    player.y=canvas.height-75;
    if(livesNum==0){isGameOver = true;didWin=false;}
  }

  if (enemyChicken.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyChicken.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}
btn_newGame.addEventListener("click",newGame);
function newGame()
{
    if (currUser==null)
    {
        alert("In order to play, you have to be logged in!");
        return;
    }
    else{
        enemyChicken = new ChickenEnemy(canvas,enemyBulletController,playerBulletController);
        stopTimer();
        points=0;
        livesNum=3;
        timeLeft=userTime;
        isGameOver=false;
        $("#theCanvas").show();
        $("#newGame-btn").show();
        $("#logo").hide();
        setupGame();
        mainGameSound.play();
        timeElapsed=0; // the number of seconds elapsed
        startTimer(); // starts the game loop
    } // end function newGame
}

function endGame(){
  stopTimer();
  $("#theCanvas").hide();
  $("#newGame-btn").hide();
  mainGameSound.pause();
  $("#welcome_div").show();
  $("#content").show();
  
}






/* ------------------------------------SIGN_UP--------------------------------------------*/
btn_signUp.addEventListener("click", function () {
    $("#content").hide();
    $("#sigging_div").show();    
  });

  // VALIDATION USING JQUERY
  $(document).ready(function () {
    // Validate Username
    $("#usernamecheck").hide();
    $("#firstnamenumcheck").hide();
    $("#lastnamenumcheck").hide();
    let usernameError = true;
    let confirmPasswordError;
     
    function validateUsername() {
      usernameError = true;
      usernameValue = $("#form_username").val();
      if (usernameValue.length == "") {
        $("#usernamecheck").show();
        usernameError = false;
        return false;
      } else if (usernameValue.length == 0) {
        $("#usernamecheck").show();
        usernameError = false;
        return false;
      } else {
        $("#usernamecheck").hide();
      }
    }

        // Validate Password
        $("#passcheck").hide();
        let passwordError = true;
        function validatePassword() {
          passwordValue = $("#form_pass").val();
          if (passwordValue.length == "") {
            $("#passcheck").show();
            passwordError = false;
            return false;
          }
      
          if (
            passwordValue.length < 8 ||
            !/\d+/.test(passwordValue) ||
            !/[A-Za-z]+/.test(passwordValue)
          ) {
            $("#passcheck").show();
            passwordError = false;
            return false;
          } else {
            $("#passcheck").hide();
          }
        }
      
        // Validate Confirm Password
        $("#confpasscheck").hide();
        confirmPasswordError = true;       
        function validateConfirmPassword() {
          let confirmPasswordValue = $("#form_conf_pass").val();
          passwordValue = $("#form_pass").val();
          if (passwordValue != confirmPasswordValue) {
            $("#confpasscheck").show();
            confirmPasswordError = false;
            return false;
          } else {
            $("#confpasscheck").hide();
          }
        }

    // Validate First name
    $("#firstnamecheck").hide();
    let firstnameError = true;
    
    function validateFirstName() {
    firstnameError = true;
    let firstnameValue = $("#form_first_name").val();
      if (firstnameValue.length == "") {
        $("#firstnamecheck").show();
        firstnameError = false;
        return false;
      } else if (firstnameValue.length == 0) {
        $("#firstnamecheck").show();
        firstnameError = false;
        return false;
      } else if(/\d+/.test(firstnameValue)){
        $("#firstnamenumcheck").show();
        firstnameError = false;
        return false;
      }else {
        $("#firstnamecheck").hide();
        $("#firsttnamenumcheck").hide();
      }
    }

    // Validate Last name
    $("#lastnamecheck").hide();
    let lastnameError = true;
    
    function validateLastName() {
      let lastnameError = true;
      let lastnameValue = $("#form_last_name").val();
      if (lastnameValue.length == "") {
        $("#lastnamecheck").show();
        nameError = false;
        return false;
      } else if (lastnameValue.length == 0) {
        $("#lastnamecheck").show();
        lastnameError = false;
        return false;
      } else if(/\d+/.test(lastnameValue)){
        $("#lastnamenumcheck").show();
        lastnameError = false;
        return false;
      }
      else {
        $("#lastnamecheck").hide();
        $("#lastnamenumcheck").hide();
      }
    }
  
    // Validate Email 
    var emailError = false;
    $("#confemail").hide();
    const email = document.getElementById("form_email");
    email.addEventListener("blur", () => {
      let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
      let emailValue = email.value;
      if (regex.test(emailValue)) {
        $("#confemail").hide();
        emailError = true;
      } else {
        $("#confemail").show();
        emailError = false;
      }
    });
  
    // Submit button
    $("#btn_submit").click(function (e) {
      e.preventDefault(); 
      validateUsername();
      validatePassword();
      validateConfirmPassword();
      validateFirstName();
      validateLastName();

      if (
        usernameError == true &&
        passwordError == true &&
        confirmPasswordError == true &&
        emailError == true &&
        firstnameError == true &&
        lastnameError == true
      ) {
        // get all fields
        let usernameValue = $("#form_username").val();
        let emailValue = $("#form_email").val();
        let passwordValue = $("#form_pass").val();
        let confirmPasswordValue = $("#form_conf_pass").val();
        let firstnameValue = $("#form_first_name").val();
        let lastnameValue = $("#form_last_name").val();
        let dateValue = $("#form_birthdate").val();
  
        // register new user
        users[usernameValue] = new User(
          firstnameValue,
          lastnameValue,
          usernameValue,
          passwordValue,
          emailValue,
          dateValue
        );
  
        // clean input fields
        $("#form_username").val("");
        $("#form_email").val("");
        $("#form_pass").val("");
        $("#form_conf_pass").val("");
        $("#form_name").val("");
        $("#form_birthdate").val("1995-01-01"); //default val

        alert("Your registeration was done successfully!");
        $("#sigging_div").hide(); 
        $("#lastnamecheck").hide();
        $("#confemail").hide();
        $("#lastnamenumcheck").hide();
        $("#content").show();

        return true;
      } else {
        return false;
      }
    });
  });

  // /* ////////////////////////////////  SETTINGS ////////////////////////////////// */
  function settings(){
    stopTimer();
    $("#newGame-btn").hide();
    mainGameSound.pause();
    $("#settings_div").show();
    $("#keycheck").hide();
    $("#theCanvas").hide();
    $("#time_settings_error_message").hide();


    document.getElementById("form_key").addEventListener('keydown', function(event) {
      // Get the key code or key value of the pressed key
      var key = event.code;
    if(keyError === true){  
      $("#keycheck").hide()
      player.setkey(key);
      keyError = false;
    }
    else{$("#keycheck").show();}});

    document.getElementById("play-btn").addEventListener("click", function () {
      var keyValue = document.getElementById("form_key").value;
      if (keyValue.length !== 1) {
        $("#keycheck").show();
        $("#form_key").val("");
        $("#game_timer_picker").val("");
        keyError = true;
        return;
      }

      var textTime = document.getElementById("game_timer_picker");
      userTime = parseInt(textTime.value);
      if (!isNaN(userTime)) {
        if (userTime<120){
          $("#game_timer_picker").val("");
          return;
        }
        } else {
          timeleft=userTime;
       }
      $("#form_key").val("");
      $("#game_timer_picker").val("");
      $("#settings_div").hide();
      $("#top_photo").hide();
      $("#bar").hide();
      $("#game_div").show();
      newGame();
    });
  }
  
  // /* ////////////////////////////////  LOGIN ////////////////////////////////// */
btn_login.addEventListener("click", function () {
    $("#content").hide();
    $("#logging_div").show();
  });

  
  // VALIDATION USING JQUERY
  $(document).ready(function () {
    // find Username , validate with our data
    $("#form_login_username").hide();
    $("#form_login_error_message").hide();
    let usernameError = true;
    
    function validateUsernameLogin() {
      let usernameValue = $("#username").val();
      if (usernameValue === "") {
        $("#form_login_username").show();
        usernameError = false;
        return false;
      } else {
        $("#form_login_username").hide();
      }
    }
  
    // find Password (validate with our login data)
    $("#form_login_passcheck").hide();
    let passwordError = true;
   
    function validatePasswordLogin() {
      let passwordValue = $("#password-log").val();
      if (passwordValue === "") {
        $("#form_login_passcheck").show();
        passwordError = false;
        return false;
      } else {
        $("#form_login_passcheck").hide();
      }
    }
  
    // Submit button
    $("#checkLogin-btn").click(function (e) {
      e.preventDefault();
      validateUsernameLogin();
      validatePasswordLogin();
  
      if (usernameError == true && passwordError == true) {
        let usernameValue = $("#username").val();
        let passwordValue = $("#password-log").val();
        let userLogin = users[usernameValue] ? users[usernameValue] : null;
        if (userLogin && userLogin.password === passwordValue) {
          currUser = userLogin;
          // clear fields
          $("#username").val("");
          $("#password-log").val("");
          $("#logging_div").hide();
          $("#logout-btn").show();
          settings();

          return true;
        }

        $("#form_login_error_message").show();
        $("#username").val("");
        $("#password-log").val("");
        return false;
      } else {
        usernameError = true;
        passwordError = true;
      }
      $("#username").val("");
      $("#password-log").val("");
      return false;
    });
  });