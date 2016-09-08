// have Firebase host arrival and departure data
// create a button for adding new train
// train form should include, train name, train destination, frequency in mins,..
// ..next arrival time, how many minutes away
// Name, desitnation, First train time, & frequency are user entered
// Minutes away is calculated by the programmer/computer



    // Initialize Firebase


      // Initialize Firebase
var config = {
    apiKey: "AIzaSyBvKvUhVUHfiCBYwVz2EJMTweSZraS3nrI",
    authDomain: "week-7-scheduler.firebaseapp.com",
    databaseURL: "https://week-7-scheduler.firebaseio.com",
    storageBucket: "week-7-scheduler.appspot.com",
};
firebase.initializeApp(config);

var trainName;
var trainDestination;
var trainFrequencyMinutes;
var firstTrainTime;
var trainNextArrival;
var trainHowManyMinutesAway;

// user clicks the submit button to add their train info
$("#addTrainBtn").on('click', function(){

    console.log(firebase);

    // grab user input values
    trainName = $("#trainNameInput").val().trim();
    trainDestination = $("#destinationInput").val().trim();
    trainFrequencyMinutes = $("#frequencyInput").val().trim();
    firstTrainTime = $("#firstTrainTimeInput").val().trim();
    // temporary object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequencyMinutes,
        firstTrain: firstTrainTime,
        created: firebase.database.ServerValue.TIMESTAMP
    }
    // adds the train info to the database
    firebase.database().ref().push(newTrain);

    // Log everything to console for testing
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);

    // clear the text boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#firstTrainTimeInput").val("");
});

// event to add the train to the database and to the html
firebase.database().ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val());

    trainName = childSnapshot.val().name;
    trainDestination = childSnapshot.val().destination;
    trainFrequencyMinutes = childSnapshot.val().frequency;
    firstTrainTime = childSnapshot.val().arrival;

    // grabbing the current time from momentjs
    var currentTime = moment();

    var trainNextArrival = currentTime.diff(firstTrainTime, trainFrequencyMinutes, "minutes");
    console.log(trainNextArrival);

    // append values to the html
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequencyMinutes + "</td><td>" + trainNextArrival + "</td><td>" + trainHowManyMinutesAway + "</td></tr>");



});
