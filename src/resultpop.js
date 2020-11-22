'user strict';

import * as sound from './sound.js';

export default class ResultPop{
    constructor(){
        this.result = document.querySelector('.result');
        this.resultText = document.querySelector('.result .text');
        this.refresh = document.querySelector('.processBtn');
        this.refresh.addEventListener('click', ()=>{
            this.init();
            this.onClick();
        })
    }

    setClickListener = (onClick) =>{
        this.onClick = onClick
    }

    init(){
        this.result.style.display = "none";
    }

    popUp(win){
        if(win){
            sound.playWin();
            this.refresh.classList.remove('fa-redo');
            this.refresh.classList.add('fa-angle-double-right');
            this.resultText.innerText = 'You Won!'; 
        }else{
            sound.playPause();
            this.refresh.classList.remove('fa-angle-double-right');
            this.refresh.classList.add('fa-redo');
            this.resultText.innerText = 'You Lost...';
        }
        
        this.result.style.display = "flex";
    }
}