
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

    // clear the text boxes value once the submit button is clicked
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#firstTrainTimeInput").val("");
});

// Grab a snapshot of the data from Firebase (database)
firebase.database().ref().on("child_added", function(childSnapshot){

    trainName = childSnapshot.val().name;
    trainDestination = childSnapshot.val().destination;
    trainFrequencyMinutes = childSnapshot.val().frequency;
    firstTrainTime = childSnapshot.val().firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

    // Current Time pulled from moment.js
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequencyMinutes;

    // Minutes Until Train
    trainHowManyMinutesAway = trainFrequencyMinutes - tRemainder;

    // Next Train
    trainNextArrival = moment().add(trainHowManyMinutesAway, "minutes").format("hh:mm");

    // append values to the html
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequencyMinutes + "</td><td>" + trainNextArrival + "</td><td>" + trainHowManyMinutesAway + "</td></tr>");

});
