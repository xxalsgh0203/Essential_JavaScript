// 'use strict'
import PopUp from './popup.js'
import Field from './field.js'

const gamestartBtn = document.querySelector('.game_start');
const gamescore = document.querySelector('.game_score');
const gametimer = document.querySelector('.game_timer');
const GAME_DURATION_SEC = 10;

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let score = 0;
let started = false;
let timer = undefined;
let result = undefined;
let replay = undefined;
let bug_num=10;
let carrot_num=10;

const gamePopUp = new PopUp();
const gameField = new Field(bug_num, carrot_num);

function initGame(){
    gametimer.innerText = '0:0';
    score = 0;
    gamescore.innerText = `${score}`;
    gamePopUp.popupStatus('hidden');
    gameField.fieldClean();
}

gamestartBtn.addEventListener('click', ()=>{
    if(started){
        gameReplay();
        showPlayBtn();
    }
    else{
        startGame();
        showStopBtn();
    }
    started = !started;
});

function startGame(){
    playSound(bgSound);
    gameField.field.innerHTML = ``;
    initGame();
    gameField.addItem('bug', "./img/bug.png", bug_num);
    gameField.addItem('carrot', "./img/carrot.png", carrot_num);
    startGameTimer();
}

function showStopBtn(){
    const icon = gamestartBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showPlayBtn(){
    const icon = gamestartBtn.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
}

function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            gameFail();
            result = undefined;
            return;
        }
        if(result === true){
            clearInterval(timer);
            gameSuccess();
            result = undefined;
            return;
        }
        if(result === false){
            clearInterval(timer);
            gameFail();
            result = undefined;
            return;
        }
        if(replay === true){
            clearInterval(timer);
            replay = undefined;
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time){
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    gametimer.innerText = `${minutes} : ${seconds}`;
}

gameField.setClickListener(event=>{
    const cnt = event.target;
    if(cnt.className == 'carrot'){
        playSound(carrotSound);
        cnt.remove();
        score++;
        if(score == carrot_num){
            gameSuccess();
        }
        gamescore.innerHTML = `${score}`;
    }
    else if(cnt.className == 'bug'){
        playSound(bugSound);
        gameFail();
    }
})

gamePopUp.setClickListener(()=>{
    initGame();
    showPlayBtn();
    started = false;
})

function gameSuccess(){
    result = true;
    gamePopUp.popupStatus('visible');
    gamePopUp.showWithText(`YOU WIN 👏🏻`);
    playSound(winSound);
}

function gameFail(){
    result = false;
    gamePopUp.popupStatus('visible');
    gamePopUp.showWithText(`YOU LOSE 😎`);
    playSound(alertSound);
}

function gameReplay(){
    playSound(alertSound);
    replay = true;
    gamePopUp.popupStatus('visible');
    gamePopUp.showWithText(`REPLAY?`);
}

function playSound(sound){
    sound.play();
}