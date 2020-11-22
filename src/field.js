'use strict';

import * as sound from './sound.js';

export const Type = Object.freeze({
    cat : 'cat',
    ghost : 'ghost'
});

export class Field{
    constructor(catCount, ghostCount){
        this.moving;
        this.catCount = catCount;
        this.ghostCount = ghostCount;
        this.unitGround = document.querySelector('.unitGround');
        this.unitGround.addEventListener('click',(event)=>{
            this.itemClick(event);
        })
    }

    init(){
        this.unitGround.innerHTML = '';
        this.addItem(Type.cat, this.catCount, 'img/cat.png');
        this.addItem(Type.ghost, this.ghostCount, 'img/ghost.png');
    }

    addItem(className, count, imgSrc){ 
        for(let i=0; i<count+this.status.level; i++){
            let randomX = Math.random()*this.unitGround.clientWidth;
            let randomY = Math.random()*this.unitGround.clientHeight;
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgSrc);
            
            this.unitGround.appendChild(item);
            item.style.transform = `translate(${randomX}px, ${randomY}px)`;
            if(className === Type.ghost){
                randomX = Math.random()*this.unitGround.clientWidth;
                randomY = Math.random()*this.unitGround.clientHeight;
                item.style.transform = `translate(${randomX}px, ${randomY}px)`;
                this.moving = setInterval(()=>{
                    randomX = Math.random()*this.unitGround.clientWidth;
                    randomY = Math.random()*this.unitGround.clientHeight;
                    item.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
                },2000)
            }  
        }
    }

    itemClick(event){
        if(this.status.started){
            if(event.target.className === Type.cat){
                const del = event.target;
                del.remove();       
                sound.playCatClick();
                this.itemClickEvent && this.itemClickEvent(Type.cat);
            } else if(event.target.className ===Type.ghost){
                sound.playGhostClick();
                this.itemClickEvent && this.itemClickEvent(Type.ghost);
            }
        }
    }

    setClickListener(itemClickEvent, status){
        this.status = status;
        this.itemClickEvent = itemClickEvent;
    }
}