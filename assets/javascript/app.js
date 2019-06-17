$(function(){

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

$("addTrainBtn").on("click", function(){
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
  trainData.ref().push(newTrain);

  alert("train added")

  $("#trainName").val("");
  $("#trainDestination").val("");
  $("firstTrain").val("");
  $("trainFrequency").val("");

  return false;
})



});