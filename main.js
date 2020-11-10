'use strict';

const body = document.querySelector('body');
const section = document.querySelector('section');
const startBtn = document.querySelector('.start');
const timeText = document.querySelector('.timer');
const scoreBox = document.querySelector('.scoreBox');
const scoreText = document.querySelector('.score');

const unitGround = document.querySelector('.unitGround');

const gameover = document.querySelector('.gameover');
const win = document.querySelector('.win');

const CAT_COUNT = 10;
const GHOST_COUNT = 20;

let clock;
let timeout = 0;
let score = 0;

const music = new Audio('sound/background.mp3');
const pause = new Audio('sound/pause.mp3');
const catClick = new Audio('sound/cat_pull.mp3');
const ghostClick = new Audio('sound/ghost_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');
const alert = new Audio('sound/alert.wav');

// 게임 시작&정지 버튼 이벤트   
section.addEventListener('click', (event)=>{
    if(event.target.className === "start"){        
        gameover.style.display = "none";
        win.style.display = "none";
        scoreBox.style.display = "flex";
        timeText.style.display = "inline";


        timer();

        addObj();
    } else if(event.target.className === "stop") {
        resultPop();
    }
});

// 게임 오브젝트 배치
function addObj(){
    if(startBtn.classList.contains('stop')){
        const unitGroup = document.createElement('div');
        unitGroup.setAttribute('class', 'unitGroup');
        unitGround.appendChild(unitGroup);
    
        for(let i=0; i<CAT_COUNT; i++){
            let randomX = Math.random()*unitGround.clientWidth;
            let randomY = Math.random()*unitGround.clientHeight;
            const cat = document.createElement('span');
            cat.setAttribute('class', 'cat');
            cat.innerHTML = `<img class= "cat" src="img/cat.png" alt="cat">`;
            
            unitGroup.appendChild(cat);
            cat.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
    
        for(let i=0; i<GHOST_COUNT; i++){
            let randomX = Math.random()*unitGround.clientWidth;
            let randomY = Math.random()*unitGround.clientHeight;
            const ghost = document.createElement('span');
            ghost.setAttribute('class', 'ghost');
            ghost.innerHTML = `<img class= "ghost" src="img/ghost.png" alt="ghost">`;
            
            unitGroup.appendChild(ghost);
            ghost.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
    }
}

// 타이머 동작함수
function timer(){
    alert.play();
    startBtn.innerHTML = `<i class="fas fa-pause"></i> PAUSE`;
    startBtn.classList.add('stop');
    startBtn.classList.remove('start');
        
    timeout = 10;
    timeText.innerHTML = `TimeOut<br/>00:${timeout}`
    timeout = 9;
    clock = setInterval(()=>{
        if(timeout === 0){
            clearTimeout(clock);
            resultPop();           
        }
        if(timeout>=10){
            timeText.innerHTML = `TimeOut<br/>00:${timeout}`
        } else{
            timeText.innerHTML = `TimeOut<br/>00:0${timeout}`
        }       

        
        timeout--;
    },1000);
}


// 게임오버 or 승리 결과창
function resultPop(){
    timeout = 0;
    clearTimeout(clock);
    timeText.innerHTML = `TimeOut<br/>00:0${timeout}`
    if(score<CAT_COUNT && win.style.display =='none'){
        pause.play();
        gameover.style.display = "flex";

        score = 0;
        scoreText.innerText = `${score}`    
    } else {
        winSound.play();

        win.style.display = 'flex';
        score = 0;
        scoreText.innerText = `${score}`
    }
}


// 유닛 클릭 이벤트 
unitGround.addEventListener('click', (event)=>{
    if(gameover.style.display == 'none' && win.style.display =='none'){
        if(event.target.className === 'cat'){
            const del = event.target.parentNode;
            del.remove();
            score ++;
            scoreText.innerText = `${score}`;

            catClick.currentTime = 0;
            catClick.play();
    
            if(score === CAT_COUNT){
                timeout = 0;
            }
        } else if(event.target.className ==='ghost'){
            resultPop();
            ghostClick.play();
        }
    }
})

// 게임 재시작 클릭 이벤트
body.addEventListener('click', (event)=>{
    if(event.target.classList.contains("fa-redo")){
        gameover.style.display = "none";
        win.style.display = "none";
        document.querySelector('.unitGroup').remove();

        timer();
        
        addObj();
    }   
})

// 크롬 브라우저에서 오디오 자동재생이 막혀있어 재생 이벤트추가
body.addEventListener('mousemove', ()=>{
    music.play();
    music.volume = 0.7;
})

// 배경음악 반복재생
music.addEventListener('ended', ()=>{
    music.currentTime = 0;
    music.play();
});
