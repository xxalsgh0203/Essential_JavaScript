const rabbit = document.querySelector('.rabbit');
const scroll_into = document.querySelector('.scroll_into');
scroll_into.addEventListener('click', () => { rabbit.scrollIntoView({behavior: 'smooth', block: 'center'}) }); // 토끼가 중간으로 부드럽게 오도록