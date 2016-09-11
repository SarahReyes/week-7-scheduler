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

    // clear the text boxes value once the submit button is clicked
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#firstTrainTimeInput").val("");
});

// function
firebase.database().ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val());

    trainName = childSnapshot.val().name;
    trainDestination = childSnapshot.val().destination;
    trainFrequencyMinutes = childSnapshot.val().frequency;
    // firstTrainTime needs to include current date, since it's the first train ever of all time
    firstTrainTime = childSnapshot.val().firstTrain;

    // check the value of the firstTrainTime, check the value of trainFrequencyMinutes
    // based on when the first train starts, also based on the current time and date, use the frequency to calulate when the next train will arrive

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log("first train time: " + firstTrainTime);
    console.log("converted train time: " + firstTimeConverted);


    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequencyMinutes;
    console.log(tRemainder);

    // Minute Until Train
    trainHowManyMinutesAway = trainFrequencyMinutes - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trainHowManyMinutesAway);

    // Next Train
    trainNextArrival = moment().add(trainHowManyMinutesAway, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + trainNextArrival);

    // append values to the html
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequencyMinutes + "</td><td>" + trainNextArrival + "</td><td>" + trainHowManyMinutesAway + "</td></tr>");


});
