'use strict'

const body = document.querySelector('body');

const music = new Audio('sound/background.mp3');
const pause = new Audio('sound/pause.mp3');
const catClick = new Audio('sound/cat_pull.mp3');
const ghostClick = new Audio('sound/ghost_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');
const alert = new Audio('sound/alert.wav');

export function playMusic(){
    playSound(music)
}

export function playPause(){
    playSound(pause)
}

export function playCatClick(){
    catClick.currentTime = 0;
    playSound(catClick)
}

export function playGhostClick(){
    playSound(ghostClick)
}

export function playWin(){
    playSound(winSound)
}

export function playAlert(){
    playSound(alert)
}

export function playSound(sound){
    sound.play();
}

// // 크롬 브라우저에서 오디오 자동재생이 막혀있어 재생 이벤트추가
body.addEventListener('mousemove', ()=>{
    playMusic();
    music.volume = 0.7;
})

// // 배경음악 반복재생
music.addEventListener('ended', ()=>{
    music.currentTime = 0;
    playMusic();
});
