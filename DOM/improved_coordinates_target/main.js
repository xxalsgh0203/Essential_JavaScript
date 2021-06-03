const vertical = document.querySelector('.vertical'); // 한번 할당한 다음에 다시 변환할 필요없기 때문에 const
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');


addEventListener('load', () => { // getBoundingClientRect() 함수를 호출할때 target 이미지가 준비 안되있을 가능성이 크기때문에 이미지와 리소스준비 된 상태인 load 상태로 함수호출
    const targetRect = target.getBoundingClientRect();
    const targetHalfWidth = targetRect.width / 2;
    const targetHalfHeight = targetRect.height / 2;

    document.addEventListener('mousemove', event => {
        const x = event.clientX;
        const y = event.clientY;
        
        tag.innerHTML = `
            ${x}px , ${y}px
        `;

        vertical.style.transform = `translateX(${x}px)`;
        horizontal.style.transform = `translateY(${y}px)`;
        target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
        tag.style.transform = `translate(${x + 20}px, ${y + 20}px)`;
    });
});

