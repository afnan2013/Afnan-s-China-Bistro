
// This file contains the authantication related divs scripts
function displaySignUpDiv(){
	document.getElementById("title-head").innerHTML = "Sign Up";
	document.getElementById("login-div").style.display = "none";
	document.getElementById("signup-div").style.display = "block";
}

function displayLoginDiv(){
	document.getElementById("title-head").innerHTML = "Login";
	document.getElementById("login-div").style.display = "block";
	document.getElementById("signup-div").style.display = "none";
}

function displayChangePassword(){

}
document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("title-head").innerHTML = "Login";
	document.getElementById("login-div").style.display = "block";
	document.getElementById("signup-div").style.display = "none";
});

