
let buttonColours=["green","red","yellow","blue"]
let gamePattern=[];
let userClickPattern=[];
let level= 0;
function playSound(name1){
  let colorName=name1;
  var audio= new Audio("sounds/"+colorName+".mp3");
  audio.play();
}
const animatePress=(currentColor)=> {
  
  $("#"+currentColor).addClass("pressed")
  setTimeout(() => {
    $("#"+currentColor).removeClass("pressed")
  }, 100);
}
let started=false;
$(document).keypress(function start() {
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
})

$("button").click(function handler(e){

  let userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
// console.log(count)
checkAnswer(userClickPattern.length-1)
});
function nextSequence (){
  userClickPattern=[];
  level++;
  // console.log(level)
  $("h1").text("Level "+level)
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// starting game

const checkAnswer=(currentLevel)=>{
  // console.log(userClickPattern);
  // console.log(gamePattern);
  if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
    // console.log("yes");
    if(gamePattern.length===userClickPattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
  else {
    // console.log("erong");
    $('body').addClass("game-over");
    let audi= new Audio("sounds/wrong.mp3")
    audi.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $('body').removeClass("game-over");
      
    }, 200);
    startOver();
  }
}
const startOver=()=>{
  started=false;
  level=0;
  gamePattern=[];
}