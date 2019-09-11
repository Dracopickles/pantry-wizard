// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAM9zBbEne9npoDn71A72M2ewPwOGPEzBs",
  authDomain: "pantry-wizard.firebaseapp.com",
  databaseURL: "https://pantry-wizard.firebaseio.com",
  projectId: "pantry-wizard",
  storageBucket: "",
  messagingSenderId: "514162634662",
  appId: "1:514162634662:web:d2e72f7c26c91f5c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create a variable to reference your database ado

let database = firebase.database();

// initial values for stuff

email = "";
password = "";

// Time to capture the button click!

$("#add-email").on("click", function(event){
  event.preventDefault();

  // grabbing values from the text o boxes
  email = $("#email-input").val().trim();
  password = $("#password-input").val().trim();

  // making the code to handle the push to firebase

  database.ref("/users").push({
    email: email,
    password: password,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
});


$("#password-checker").on("click", function(event){
  event.preventDefault();
  let email = $("#email-input").val()
  let password = $("#password-input").val()
  let isUserFound = false; 
  database.ref('/users/').once('value').then(function(snapshot){
    snapshot.forEach(function(e) {
      console.log(e.val());
      if (e.val().email === email && e.val().password === password){
      // what happens if right email or password?
      console.log("success")
      isUserFound = true;
      localStorage.setItem("logged-in", true);
      }

    });
    if (!isUserFound){
      console.log (isUserFound);
      // what happens if wrong emai or password?
      //alert("this email or password is incorrect!");
      //random text;
      let p = $('<p>').text(isUserFound);
      
      $("#error-message").append(p);
    }
    
    // what happens if wrong emai or password?
    //...

    console.log(snapshot)
  });
});