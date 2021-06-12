
export default class PopUp{
    constructor(){
        this.popup = document.querySelector('.pop_up');
        this.restart = document.querySelector('.pop_up_refresh');
        this.popupMessage = document.querySelector('.pop_up_message');
        // this.restart.addEventListener('click', ()=>{
        //     this.onClick && this.onClick();
        // })
    }

    // setClickListener(onClick){
    //     this.onClick = onClick;
    // }
    
    showWithText(text){
        this.popupMessage.innerHTML = text;
    }

    popupStatus(status){
        this.popup.style.visibility = status;
    }
}