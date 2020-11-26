// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    location.replace("../dashboard.html")
  } else {
    console.log('user logged out');
  }
});


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  var userEmail = signupForm["signup-email"].value;
  var userPass = signupForm["signup-password"].value;
  //console.log(userEmail);

  auth.createUserWithEmailAndPassword(userEmail, userPass).then(
      function(crd) {
        console.log(crd);
        //location.replace("../index.html")
      }
    ).catch(function(error) {
    // Handle Errors 
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
});


const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  var userEmail = loginForm["login-email"].value;
  var userPass = loginForm["login-password"].value;
  console.log(userEmail);

  auth.signInWithEmailAndPassword(userEmail, userPass).then(
      function(crd) {
        console.log(crd);
        //location.replace("../dashboard.html")
      }
    ).catch(function(error) {
    // Handle Errors 
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
