const robotBtn = document.querySelector("#robotBtn")
const hackBtn = document.querySelector('#hackBtn')
robotBtn.addEventListener("click", activateAI);
hackBtn.addEventListener("click", hackAI);
let hackedAI = false
let slope = 1
let paddle2_relative_to_ball = 1;
let run;
let rise;
let isAI = false
let aiIntervalID;
const middle_of_paddle2 = paddle2.height/2;
function mainAI() {
    switch(isAI){
        case true:
            run = ballX-paddle2.x
            rise = ballY-paddle2.y
            slope = (rise)/(run)
            readData();
            ai_move(paddle2_relative_to_ball);
            break;
        case false:
            return;
    }
}
function activateAI() {
    switch(isAI) {
        case true:
            robotBtn.textContent = 'AI : OFF';
            isAI = false;
            break;
        case false:
            robotBtn.textContent = 'AI : ON';
            isAI = true;
            resetGame()
            break;
    }}
// States:
// 1 - slope(left to right is going down)
// 0 - slope is flat
// 2 - slope(left to right is going up)
// negative rise = ball is above // positive rise = ball is below

function readData() {
    switch(true) {
        case rise < 0 && run > 10:
            paddle2_relative_to_ball = 1;
            break;
        case run < 10 && rise < 0 :
            paddle2_relative_to_ball = 1;
            break;
        case rise > 20 && run > 10:
            paddle2_relative_to_ball = 2;
            break;
        case run < 10 && rise > 50 :
            paddle2_relative_to_ball = 2;
            break;
        default:
            paddle2_relative_to_ball = 0;
            break;
    }
}

function ai_move(state) {
    console.log(rise, state, ballY, paddle2.y)
    switch(true) {
        case state == 2:
            if( paddle2.y < gameHeight - paddle2.height) {
                paddle2.y += paddleSpeed
            }
            break;
        case state == 1:
            if( paddle2.y > 0) {
                paddle2.y -= paddleSpeed
            }
            break;
        case state == 0:
            break;
    }}

function hackAI() {
    switch(hackedAI) {
        case true:
            hackedAI = false;
            hackBtn.textContent = 'Hack AI : OFF';
            maximum_time = 600;
            minimum_time = 400
            resetGame()
            break;
        case false:
            maximum_time = 400
            minimum_time = 100
            hackedAI = true;
            hackBtn.textContent = 'Hack AI : ON';
            resetGame();
            break;
    }
}

function nextAITick() {
    {
        aiIntervalID = setTimeout(() => {
            if(paused == false) {
                mainAI();
            }
            nextAITick();
        }, (Math.random() * (maximum_time - minimum_time) + minimum_time))
    }
}