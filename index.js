const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
let paddle1Color = "lightblue";
let paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};
let paused = false
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
pauseBtn.addEventListener("click", pauseGame);
gameStart();
function gameStart() {
    console.log('Starting...')
    createBall()
    nextTick()
}
function pauseGame() {
    switch(paused) {
        case true:
            paused = false;
            pauseBtn.textContent = 'Pause'
            break;
        case false:
            paused = true;
            pauseBtn.textContent = 'Unpause'
            break;
    }
}
function resetGame() {
    console.log('Test');
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballSpeed = 0;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
}

function nextTick() {
    {
        intervalID = setTimeout(() => {
            if(paused == false) {
                clearBoard();
                drawPaddles();
                moveBall();
                drawBall(ballX, ballY);
                checkCollision()
            }
            nextTick()
        }, 10)   
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}

function drawPaddles() {
    ctx.strokeStyle = paddleBorder
    ctx.fillStyle = paddle1Color
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    ctx.strokeRect(paddle1.x,paddle1.y, paddle1.width, paddle1.height)
    ctx.fillStyle = paddle2Color
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
}

function createBall() {
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1

    }
    else{
        ballXDirection = -1
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = Math.random() * 1

    }
    else{
        ballYDirection = Math.random() * -1
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY)
}

function drawBall(ballX, ballY) {
    ctx.fillStyle = ballColor
    ctx.strokeStyle = ballBorderColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, 2*Math.PI)
    ctx.stroke()
    ctx.fill()
}

function moveBall() {
    ballX += (ballSpeed * ballXDirection)
    ballY += (ballSpeed * ballYDirection)
    if(ballSpeed > 1) {
        ballSpeed = ballSpeed - 0.0001
    }
}

function checkCollision() {
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }
    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
    }
    if(ballX <= 0){
        player2Score+=1;
        updateScore();
        createBall();
        return;
    }
    if(ballX >= gameWidth){
        player1Score+=1;
        updateScore();
        createBall();
        return;
    }
    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
    if(ballX >= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius; // if ball gets stuck
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }

}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const paddle1UP = 87
    const paddle1DOWN = 83
    const paddle2UP = 104
    const paddle2DOWN = 98
    if(paused == false){
        switch (keyPressed) {
            case paddle1UP:
                if( paddle1.y > 0) {
                    paddle1.y -= paddleSpeed
                }
                break;
            case paddle1DOWN:
                if( paddle1.y < gameHeight - paddle1.height) {
                    paddle1.y += paddleSpeed
                }
                break;
            case paddle2UP:
                if( paddle2.y > 0) {
                    paddle2.y -= paddleSpeed
                }
                break;
            case paddle2DOWN:
                if( paddle2.y < gameHeight - paddle2.height) {
                    paddle2.y += paddleSpeed
                }
                break;
            default:
                console.log('Invalid Input!')
                break;
        }
    }
}

function updateScore() {
    scoreText.textContent = `${player1Score} : ${player2Score}`
}