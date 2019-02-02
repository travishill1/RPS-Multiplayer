//   Pseudocode
// PLAYER CONNECTIVITY
// make Players directory and Waiting directory in the firebase database.
// a Player will enter username into name-input then click Find Game.
// this will search for a player in Waiting directory who needs a player 2.
// if no player is found in waiting directory, then move (create a copy) of that player from Players directory to the waiting directory.
// that player then waits for a player 2 to find them in the waiting directory.  
// Once both players are matched, they are both moved (copied, since it's firebase - duplicative) to the CurrentGames directory.
// Then the game will start and end either for 1 round (whereupon the players are disconnected) or a pre-set number of rounds (3?).
// during a round of RPS, if both playerChoice != null (if both players have selected an action), then proceed with the round and check action resolution.
// I believe the playerChoices/actions will affect the data in the CurrentGames directory, which is how two opposing players will communicate their actions with each other.
// Once the game/connection ends, the players are removed from CurrentGame dir and the necessary win/lose data is extracted to update the main Players dir data.




var config = {
    apiKey: "AIzaSyBEf_TO2DMiqZIAGz3FN6GJ4Wqc5zyA5zg",
    authDomain: "rps-multiplayer-acb37.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-acb37.firebaseio.com",
    projectId: "rps-multiplayer-acb37",
    storageBucket: "rps-multiplayer-acb37.appspot.com",
    messagingSenderId: "907006080098"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  var players = database.ref("/players")

  var now = new Date().getTime();
  var newPlayers = players.orderByChild("timestamp").startAt(now);

  function addPlayer(event) {
      let username = $('#name-input').val();
      let timestamp = new Date().getTime();

      players.push({
          username,
          timestamp,
      })
  }

newPlayers.on("child_added", function(childSnap){
    console.log("player info: ")
    console.log(childSnap.val().username);
    console.log(childSnap)

    database.ref("/waiting").push(childSnap.val());
})



$("#find-game").on("click",addPlayer);
