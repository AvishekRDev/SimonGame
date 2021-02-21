//Required arrays for storing user's click pattern and the random game pattern

var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
//set initial level to zero
var level = 0;

//boolean to detect game start.
var gameStart = false;


//function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//add pressed class to the clicked button
function animatePress(currentColor) {
  $("#" + currentColor).click(function() {
    $(this).addClass("pressed");

    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);

  });
}

//check if the user input pattern is correct, i.e. it matches the random pattern generated
function checkAnswer(currentLevel) {

  //check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();


  }

}

//detect the first key press
$(document).keypress(function() {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});



$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //call play sound when a button is clicked
  playSound(userChosenColor);
  //call animate press to replicate a button press
  animatePress(userChosenColor);
  //match with the
  checkAnswer(userClickedPattern.length - 1);

});

//next random colour sequence
function nextSequence() {

  userClickedPattern = [];

  level++;
  //change level heading(add one more)
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

//set everything to default when the user starts a new game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
