// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    if (user.emailVerified){
    //if(user){

      location.replace("dashboard.html")
    }
    else{
      alert("User is not verified");
      auth.signOut();
    }
  } else {
    console.log('user logged out');
  }
});


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  
  var userName = signupForm["signup-username"].value;
  var userEmail = signupForm["signup-email"].value;
  var userPass = signupForm["signup-password"].value;
  console.log(userName);

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(userEmail, userPass).then(cred => {
    //console.log(cred.user.uid);
    //console.log(db.collection('products'));
    return db.collection('users').add({
      username: signupForm["signup-username"].value
    });
  }).then(() => {
    // close the signup modal & reset form
    // const modal = document.querySelector('#modal-signup');
    // M.Modal.getInstance(modal).close();
    // signupForm.reset();
  });

});


const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  var userEmail = loginForm["login-email"].value;
  var userPass = loginForm["login-password"].value;
  //console.log(userEmail);

  auth.signInWithEmailAndPassword(userEmail, userPass).then(
      function(crd) {
        //console.log(crd);
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
