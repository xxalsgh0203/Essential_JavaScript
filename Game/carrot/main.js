const restart = document.querySelector('.pop_up_refresh');
const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();

restart.addEventListener('click', () => initGame());

function initGame(){
    addItem('bug', "./img/bug.png", 5);
    addItem('carrot', "./img/carrot.png", 5);
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

