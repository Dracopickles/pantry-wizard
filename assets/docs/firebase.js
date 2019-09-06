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
  });

$("#password-checker").on("click", function(event){
  database.ref('/users/' + userId).once('value').then(function(snapshot){
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    //...

    console.log(snapshot)
  });
});  
});