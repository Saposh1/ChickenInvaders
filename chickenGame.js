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
  
//   class Result {
//     constructor(username, score) {
//       this.username = username;
//       this.score = score;
//     }
//   }


// ---------- on html load DO ------------------//
$("#sigging_div").hide(); 
$("#logging_div").hide(); 
$("#logout-btn").hide();


  // anchors nav bar
  const anchor_welcome = document.getElementById("welcome_a");
  const anchor_singging = document.getElementById("signning_a");
  const anchor_logging = document.getElementById("logging_a");
  const anchor_about = document.getElementById("about_a");
  const anchor_game = document.getElementById("game_a");

  // divs
// const div_welcome = document.getElementById("welcome_div");
// const div_welcome_login = document.getElementById("welcome_div-logged-in");
// const div_signUp = document.getElementById("sigging_div");
// const div_login = document.getElementById("loggining_div");
// const div_settings = document.getElementById("settings_div");
// const div_settings_login = document.getElementById("settings_div-logged-in");
// const div_about = document.getElementById("about_div");
// const div_top10 = document.getElementById("top10_div");
// const div_game = document.getElementById("game_div");
// const div_game_login = document.getElementById("game_div-logged-in");

// buttons 
const btn_signUp = document.getElementById("signup-btn");
const btn_login = document.getElementById("login-btn");
const btn_submit = document.getElementById("btn_submit");
const btn_checkLogin = document.getElementById("checkLogin-btn");
// const btn_logout = document.getElementById("logout-btn");


// DB
var users = {};
users["p"] = new User("Tester", null, null, "testuser", null ,null);
var results = [];

/* Page Variables */
let currPage = "welcome";
let currUser = null;

/* --------------------------------------------  NAV PAGES ----------------------------------------- */

// function changePage(
//     from_page,
//     to_page,
//     have_anchor_from,
//     have_anchor_to,
//     caseName
//   ) {
//     from_page.classList.toggle("hide");
//     to_page.classList.toggle("hide");
  
//     if (have_anchor_from) {
//       have_anchor_from.classList.toggle("active");
//     }
//     if (have_anchor_to) {
//       have_anchor_to.classList.toggle("active");
//     }
  
//     if (to_page === div_game_login) {
//       anchor_game.style.backgroundColor = "#33dbf5";
//     } else {
//       anchor_game.style.backgroundColor = "rgb(165, 162, 162)";
//     }
//     if (from_page === div_game_login) {
//       clearAllIntervals();
//     }
//     currPage = caseName;
//   }
  
//   anchor_welcome.addEventListener("click", function () {
//     switch (currPage) {
//       case "welcome":
//         break;
//       case "settings":
//         changePage(
//           div_settings,
//           div_welcome,
//           anchor_settings,
//           anchor_welcome,
//           "welcome"
//         ); 
//         break;
  
//       case "settings-login":
//         changePage(
//           div_settings_login,
//           div_welcome_login,
//           anchor_settings,
//           anchor_welcome,
//           "welcome-login"
//         );
  
//         break;
  
//       case "game":
//         changePage(div_game, div_welcome, anchor_game, anchor_welcome, "welcome");
//         break;
  
//       case "game-login":
//         let divFrom;
//         switch (gameStatus) {
//           case "win":
//             divFrom = div_winnerPage;
//             break;
//           case "lose":
//             divFrom = div_looserPage;
//             break;
//           case "play":
//             divFrom = div_game_login;
//             break;
//         }
//         changePage(
//           divFrom,
//           div_welcome_login,
//           anchor_game,
//           anchor_welcome,
//           "welcome-login"
//         );
  
//         break;
  
//       case "about":
//         changePage(
//           div_about,
//           currUser ? div_welcome_login : div_welcome,
//           anchor_about,
//           anchor_welcome,
//           currUser ? "welcome-login" : "welcome"
//         );
//         break;
//       case "signUp":
//         changePage(div_signUp, div_welcome, false, false, "welcome");
  
//         break;
//       case "login":
//         changePage(div_login, div_welcome, false, false, "welcome");
//         break;
  
//       case "top10":
//         changePage(
//           div_top10,
//           currUser ? div_welcome_login : div_welcome,
//           anchor_top10,
//           anchor_welcome,
//           currUser ? "welcome-login" : "welcome"
//         );
//         break;
  
//       case "welcome-login":
//         break;
//     }
//   });

/* ------------------------------------SIGN_UP--------------------------------------------*/
btn_signUp.addEventListener("click", function () {
    $("#welcome_div").hide();
    $("#sigging_div").show();
    // currPage = "signUp";
  });

  // VALIDATION USING JQUERY
  $(document).ready(function () {
    // Validate Username
    $("#usernamecheck").hide();
    let usernameError = true;
     
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
        let confirmPasswordError = true;       
        function validateConfirmPassword() {
          confirmPasswordValue = $("#form_conf_pass").val();
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
    firstnameValue = $("#form_first_name").val();
      if (firstnameValue.length == "") {
        $("#firstnamecheck").show();
        firstnameError = false;
        return false;
      } else if (firstnameValue.length == 0 || /\d+/.test(firstnameValue)) {
        $("#firstnamecheck").show();
        firstnameError = false;
        return false;
      } else {
        $("#firstnamecheck").hide();
      }
    }

    // Validate Last name
    $("#lastnamecheck").hide();
    let lastnameError = true;
    
    function validateFirstName() {
      lastnameError = true;
      lastnameValue = $("#form_last_name").val();
      if (lastnameValue.length == "") {
        $("#lastnamecheck").show();
        nameError = false;
        return false;
      } else if (lastnameValue.length == 0 || /\d+/.test(lastnameValue)) {
        $("#lastnamecheck").show();
        lastnameError = false;
        return false;
      } else {
        $("#lastnamecheck").hide();
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
  
        // switch page to login
        changePage(div_signUp, div_login, false, false, "login");
  
        // clean input fields
        $("#form_username").val("");
        $("#form_email").val("");
        $("#form_pass").val("");
        $("#form_conf_pass").val("");
        $("#form_name").val("");
        $("#form_birthdate").val("1995-01-01"); //default val
        return true;
      } else {
        return false;
      }
    });
  });

  // /* ////////////////////////////////  LOGIN ////////////////////////////////// */
btn_login.addEventListener("click", function () {
    $("#welcome_div").hide();
    $("#logging_div").show();
    //currPage = "login";
  });
  
  // VALIDATION USING JQUERY
  $(document).ready(function () {
    // find Username , validate with our data
    $("#form_login_usernamecheck").hide();
    $("#form_login_error_message").hide();
    let usernameError = true;
    
    function validateUsernameLogin() {
      let usernameValue = $("#form_login_username").val();
      if (usernameValue.length == "") {
        $("#form_login_usernamecheck").show();
        usernameError = false;
        return false;
      } else {
        $("#form_login_usernamecheck").hide();
      }
    }
  
    // find Password (validate with our login data)
    $("#form_login_passcheck").hide();
    let passwordError = true;
   
    function validatePasswordLogin() {
      let passwordValue = $("#form_login_pass").val();
      if (passwordValue.length == "") {
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
        let usernameValue = $("#form_login_username").val();
        let passwordValue = $("#form_login_pass").val();
        let userLogin = users[usernameValue] ? users[usernameValue] : null;
        if (userLogin && userLogin.password === passwordValue) {
          currUser = userLogin;
  
          // set welcome message to specific user
          $("#logged_in_welcome").text(`Welcome back, ${userLogin.first_name}!`);
            
  
          // clear fields
          $("#form_login_username").val("");
          $("#form_login_pass").val("");
          $("#logging_div").hide();
          $("#game_div").show();

          return true;
        }

        $("#form_login_error_message").show();
        return false;
      } else {
        usernameError = true;
        passwordError = true;
      }
      return false;
    });
  });