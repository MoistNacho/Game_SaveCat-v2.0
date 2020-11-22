'use strict';
import {Field, Type} from './field.js';
import * as sound from './sound.js';

export default class GameBuild{
    gameTime(num){
        this.game__Time = num;
        return this;
    }
    
    catCount(num){
        this.cat__Count = num;
        return this;
    }

    ghostCount(num){
        this.ghost__Count = num;
        return this;
    }

    build(){
        return new Game(
            this.game__Time,
            this.cat__Count,
            this.ghost__Count
        );
    }
}

class Game {
    constructor(gameTime, catCount, ghostCount){
        this.gameTime = gameTime;
        this.catCount = catCount;
        this.ghostCount = ghostCount;
        this.timeText = document.querySelector('.timer');
        this.levelText = document.querySelector('.level');
        this.scoreBox = document.querySelector('.scoreBox');
        this.scoreText = document.querySelector('.score');
        this.startBtn = document.querySelector('.start');
        this.startBtn.addEventListener('click', ()=>{
            if(!this.status.started && !this.startBtn.matches('.pause')){                     
                this.start();
            } else {
                this.finish();
            }
        });
        this.clock;
        this.status = {
            'timeout' : 0,
            'score' : 0,
            'started' : false,
            'level' : 1,
            'bonusTime' : 0
        };
        
        this.gameField = new Field(this.catCount, this.ghostCount);
        this.gameField.setClickListener(this.itemClickEvent, this.status);
    }

    setGameListener(onGame){
        this.onGame = onGame;
    }

    start = ()=>{
        this.startBtn.classList.remove('pause');
        this.scoreBox.style.display = "flex";
        this.levelText.style.display = "inline";
        this.levelText.innerText = `Level ${this.status.level}`;
        this.timeText.style.display = "inline";
        this.status.started = true;
        this.timer();
        this.gameField.init();
    }

    finish = ()=>{
        this.startBtn.classList.add('pause');
        this.status.started = false;
        this.status.timeout = 0;
        this.onGame && this.onGame(this.status.score === this.catCount+this.status.level);
        if(this.status.score === this.catCount+this.status.level){
            this.status.level++;
        } else {
            this.status.level = 1;
            this.status.bonusTime = 0;
        }

        clearTimeout(this.clock);
        this.timeText.innerHTML = `TimeOut<br/>00:0${this.status.timeout}`  
        this.status.score = 0;
        this.scoreText.innerText = `${this.status.score}` 
    }

    // 게임 타이머
    timer(){
        sound.playAlert();
        this.startBtn.innerHTML = `<i class="fas fa-pause"></i> PAUSE`;
        this.startBtn.classList.add('stop');
        this.startBtn.classList.remove('start');

        if(this.status.level%5 === 0){
            this.status.bonusTime++;
        } 
        
        this.status.timeout = this.gameTime + this.status.bonusTime;   
        this.timeText.innerHTML = `TimeOut<br/>00:${this.status.timeout}`
        this.status.timeout--;
        this.clock = setInterval(()=>{
            if(this.status.timeout === 0){
                clearTimeout(this.clock);
                this.finish();       
            }
            if(this.status.timeout>=this.gameTime){
                this.timeText.innerHTML = `TimeOut<br/>00:${this.status.timeout}`
            } else{
                this.timeText.innerHTML = `TimeOut<br/>00:0${this.status.timeout}`
            }       
           
            this.status.timeout--;
        },1000);
    }

    itemClickEvent = (item) => {
        if(this.status.started){
            if(item === Type.cat){
                this.status.score++;
                this.scoreText.innerText = `${this.status.score}`;         
        
                if(this.status.score === this.catCount+this.status.level){
                    this.status.timeout = 0;
                }
            } else if(item === Type.ghost){
                this.finish();
            }
        }
    }
}