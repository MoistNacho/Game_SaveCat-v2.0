'use strict';
import ResultPop from './resultpop.js';
import GameBuild from './game.js';

const resultPop = new ResultPop();
const game = new GameBuild()
.gameTime(10)
.catCount(4)
.ghostCount(7)
.build();

game.setGameListener((win)=>{
    resultPop.popUp(win);
})

resultPop.setClickListener(game.start);
