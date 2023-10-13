function startGame(){
    var isNameSaved = saveName();
    if(isNameSaved){
        window.location = 'gameBoard.html';
    }else{
        alert("Enter name to start the game.");
    }
}

function saveName(){
    
    var name = document.getElementById("name").value; 
    if(name.length == 0){       
        return false;
    }else{
        localStorage.setItem('player', name);
        return true;
    }
}

function updatePlayer(){
    var name = localStorage.getItem("player");
    document.getElementById("name-score").innerText = name + " score"; 
}

var timeLeft = 60;  //number of seconds game will run

function startGameTime() {
    var interval = setInterval(function(){
         if(timeLeft > 0){
            timeLeft--;
            document.getElementById("timeLeft").innerHTML = timeLeft;
         }
         else{
                clearInterval(interval);
                localStorage.setItem("score", score);
                window.location = "TheEnd.html";
         }
     }, 1000);
 }

function createBubbles(){
    var bubbles = "";

    for(var i = 1; i <= 50; i++){
        var number = Math.floor(Math.random() * 10);
        bubbles += `<div class="bubble" onclick="checkBubbleHit(this)">${number}</div>`;
    }

    document.getElementById("gameBoardBubbles").innerHTML = bubbles;
}

var target = 0;
function getNewTarget(){
    target = Math.floor(Math.random() * 10);
    document.getElementById("target").innerHTML = target;
}

function checkBubbleHit(object){
    playClickSound();
    var hitNumber = Number(object.innerText);

    if(hitNumber === target){
        incrementScore();
        createBubbles();
        getNewTarget();
    }else{
        decrementScore();
        createBubbles();
        getNewTarget();
    }
}

var score = 0;
function incrementScore(){
    score += 10;
    document.getElementById("score").innerHTML = score;
}

function decrementScore(){
    score -= 10;
    document.getElementById("score").innerHTML = score;
}

function loadGame(){
    updatePlayer();
    startGameTime();
    createBubbles();
    getNewTarget();
}

var win = ["Hip Hip Hurray, You Won", "Winner Winner Chicken Dinner", "Marvelous, You Won", "Finally, You Won"];
var loose = ["Better Luck, Next Time", "Doomed, You Lose", "Sorry, You Lose this time", "Oops, You Lose"];

function updateScoreBoard(){
    var randomNumber = Math.floor(Math.random() * (win.length - 0) + 0);
    var score = localStorage.getItem("score");
    var player = localStorage.getItem("player");

    var result = "";

    if(score > 0){
        result = win[randomNumber];
    }else{
        result = loose[randomNumber];
    }
   
    document.getElementById("gameResult").innerHTML = result;
    document.getElementById("gameScore").innerHTML = `${player}, your score : ${score}`;
}

function exit(){
    localStorage.removeItem("player");
    localStorage.removeItem("score");
}

function playAgain(){
    localStorage.removeItem("score");
}

function playClickSound(){
    var sound = document.getElementById("clickSound"); 
    sound.play();
}