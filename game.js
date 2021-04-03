//declaration
var gameColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var buttonColor;
var userClickedPattern= [];
var userChosenColor;
var gameStart=0;
var level=0;
// Matching the user's input to generated gamePattern to restart/continue/end game
function checkAnswer(index) {
  if(userClickedPattern[index]==gamePattern[index])
  {
    if(gamePattern.length==userClickedPattern.length)
    {
    userClickedPattern=[];
    setTimeout(function() {
      nextSequence();
    }, 1000);
    }
  }
  else
  {
    var gameOverSound= new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    gameStart=0;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
  }
}
//button animation and sound on getting pressed
function buttonAnimationAndSound(buttonColor) {
  var audioElementRandom = new Audio("sounds/" + buttonColor + ".mp3");
  audioElementRandom.play();
  $("#"+buttonColor).addClass("pressed");
  setTimeout(function() {
    $("#"+buttonColor).removeClass("pressed");
  }, 100);
}
// generating the random color
function nextSequence() {
  $("#level-title").text("Level "+level);
  level++;
  buttonColor = gameColors[Math.floor(Math.random() * 4)];
  gamePattern.push(buttonColor);
  buttonAnimationAndSound(buttonColor);
}
// user's input
$(".btn").on("click", function(event) {
    userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    buttonAnimationAndSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });
// to start the game
$(document).on("dblclick", function(){
  if(gameStart==0)
  {
    gameStart++;
    nextSequence();
  }
});
$(document).on("keypress", function(){
  if(gameStart==0)
  {
    gameStart++;
    nextSequence();
  }
});
