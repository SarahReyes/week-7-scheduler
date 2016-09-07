// have Firebase host arrival and departure data
// create a button for adding new train
// train form should include, train name, train destination, frequency in mins,..
// ..next arrival time, how many minutes away
// Name, desitnation, First train time, & frequency are user entered
// Minutes away is calculated by the programmer/computer

<script src="https://www.gstatic.com/firebasejs/3.3.0/firebase.js"></script>

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBvKvUhVUHfiCBYwVz2EJMTweSZraS3nrI",
    authDomain: "week-7-scheduler.firebaseapp.com",
    databaseURL: "https://week-7-scheduler.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);
