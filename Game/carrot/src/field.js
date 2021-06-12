'use strict'

export default class Field{
    constructor(numberofBugs, numberofCarrots){
        this.bugnum = numberofBugs;
        this.carrotnum = numberofCarrots;
        this.field = document.querySelector('.game_field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', event=>{
            this.onItemClick && this.onItemClick(event);
        })
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    addItem(className, imgsrc, count){
        for(let i=0; i<count; i++){
            var newItem = document.createElement("img");
            newItem.setAttribute("class", className);
            newItem.setAttribute("src", imgsrc);
            newItem.style.position = 'absolute';
            newItem.style.left = `${getRandomNum(0, this.fieldRect.width - 50)}px`;
            newItem.style.top = `${getRandomNum(0, this.fieldRect.height - 50)}px`;
            this.field.appendChild(newItem);
        }
    }

    fieldClean(){
        this.field.innerHTML = ``;
    }

    onItemClick(event){
        const cnt = event.target;
    }

}

function getRandomNum(min, max){
    return Math.random() * (max-min) + min;
}