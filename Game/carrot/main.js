const restart = document.querySelector('.pop_up_refresh');
const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const gamestartBtn = document.querySelector('.game_start');
const gamescore = document.querySelector('.game_score');
const popup = document.querySelector('.pop_up');
const popupMessage = document.querySelector('.pop_up_message');
const gametimer = document.querySelector('.game_timer');
const GAME_DURATION_SEC = 5;
let score = 0;
let started = false;
let timer = undefined;
let result = undefined;

function initGame(){
    gametimer.innerText = '0:0';
    score = 0;
    gamescore.innerText = `${score}`;
    popup.style.visibility = 'hidden';
    field.innerHTML = ``;
}

function getRandomNum(min, max){
    return Math.random() * (max-min) + min;
}

function addItem(className, imgsrc, count){
    for(let i=0; i<count; i++){
        var newItem = document.createElement("img");
        newItem.setAttribute("class", className);
        newItem.setAttribute("src", imgsrc);
        newItem.style.position = 'absolute';
        newItem.style.left = `${getRandomNum(0, fieldRect.width - 50)}px`;
        newItem.style.top = `${getRandomNum(0, fieldRect.height - 50)}px`;
        field.appendChild(newItem);
    }
}

gamestartBtn.addEventListener('click', ()=>{
    if(started){
        changetoStopBtn();
    }
    else{
        field.innerHTML = ``;
        initGame();
        addItem('bug', "./img/bug.png", 5);
        addItem('carrot', "./img/carrot.png", 5);
        startGameTimer();
    }
});

function startGame(){

}

function stopGame(){

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
        if(score == 5){
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
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time){
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    gametimer.innerText = `${minutes} : ${seconds}`;
}

field.addEventListener('click', event=>{
    const cnt = event.target;
    if(cnt.className == 'carrot'){
        cnt.remove();
        score++;
        if(score == 5){
            gameSuccess();
        }
        gamescore.innerHTML = `${score}`;
    }
    else if(cnt.className == 'bug'){
        gameFail();
    }
});


restart.addEventListener('click', ()=>{
    initGame();
});

function gameSuccess(){
    result = true;
    popup.style.visibility = 'visible';
    popupMessage.innerHTML = `SUCCESS`;
}

function gameFail(){
    result = false;
    popup.style.visibility = 'visible';
    popupMessage.innerHTML = `FAIL`;
}