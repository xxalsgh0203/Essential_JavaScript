'use strict';

const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');

function onAdd(){
    // 1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    if(text === ''){
        input.focus();
        return;
    }
    // 2. 새로운 아이템을 만듬(텍스트 + 삭제버튼)
    const item = createItem(text);
    // 3. items 컨테이너에 새로 만든 아이템을 추가한다
    items.appendChild(item);

    // 4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({block: 'center'});
    // 5. 인풋을 초기화 한다.
    input.value = '';
    input.focus();
}

function createItem(text){
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item_row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'item_name');
    itemName.innerText = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item_delete');
    deleteBtn.innerHTML = `🛢`;
    deleteBtn.addEventListener('click', () => {items.removeChild(itemRow)});
    
    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item_divder');

    item.appendChild(itemName);
    item.appendChild(deleteBtn);

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);

    return itemRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', event => {
    if(event.key === 'Enter')
        onAdd();
});