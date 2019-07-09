// $(function(){

let firebaseConfig = {
    apiKey: "AIzaSyCfm-H-491QiCYteVst0Qnrh-I-AWN6N6k",
    authDomain: "trainscheduler-2222e.firebaseapp.com",
    databaseURL: "https://trainscheduler-2222e.firebaseio.com",
    projectId: "trainscheduler-2222e",
    storageBucket: "trainscheduler-2222e.appspot.com",
    messagingSenderId: "928454805206",
    appId: "1:928454805206:web:80a2018e4c09dca4"
}


firebase.initializeApp(firebaseConfig);


var trainData = firebase.database();

$(".form").on("submit", function(event){
  event.preventDefault()
  let trainName = $("#trainName").val();
  let destination = $("#trainDestination").val();
  let firstTrain = moment($("#firstTrain").val(),"HH:mm").subtract(10, "years").format("X");
  let frequency = $("#trainFrequency").val();

  let newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }

  console.log(newTrain);
  trainData.ref().push(newTrain);

 
  
  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#firstTrain").val("");
  $("#trainFrequency").val("");

  return false;
  
})

trainData.ref().on("child_added", function(snapshot){
  console.log(snapshot.val());
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

  $(".table > tBody").append("<tr><td>"+name+"</td> <td>"+destination+"</td><td>"+
  frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})

// });