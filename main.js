import { global } from "./global.js";
import { Penguin } from "../gameObjects/penguin.js";
import { Ice } from "../gameObjects/ice.js";
import { Fish } from "../gameObjects/fish.js";
import { Enemy } from "../gameObjects/enemy.js";

const startButton = document.getElementById('startButton');
const canvas = document.getElementById('canvas');
const timerDisplay = document.getElementById('timerDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const restartButton = document.getElementById('restartButton');
const header = document.getElementById('header');
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click',resetGame);

global.score= 0;
let currentLevel = 1;

function startGame() {
    canvas.style.display = 'block';
    startButton.style.display = 'none';
    timerDisplay.style.display = 'block';
    scoreDisplay.style.display = 'block';
    restartButton.style.display = 'block';
    header.style.display = 'none';
    gameStart = true;
    timeLeft = 120;
    global.score = 0;
    scoreDisplay.textContent = `🐟: ${global.score}`;
}

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; 
    global.deltaTime /= 1000;
    global.prevTotalRunningTime = totalRunningTime;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
    
    if (gameStart == true){
    for (var i = 0; i < global.allGameObjects.length; i++) {
        if (global.allGameObjects[i].active == true) {

            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].draw();
        }
    }} if (currentLevel === 1) {
        winGame(); 
    } else if (currentLevel === 2) {
        checkWinLevel2(); 
    }
    requestAnimationFrame(gameLoop); 
}
let gameStart = false;
let timeLeft = 120;
let timeInterval = setInterval(function() {
    timeLeft--;
    update();
    if (timeLeft <=0 && gameStart == true) {
        clearInterval(timeInterval);
        alert("Game Over! Time's up!");
    }
},1000);

function update() {
    document.getElementById('timerDisplay').innerText=`🕑: ${timeLeft}s`;
}

function setupGame() {
    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 0, 0, 0, 0, 2, 2, 1],
        [1, 2, 1, 1, 0, 0, 1, 1, 2, 1],
        [1, 3, 1, 2, 0, 0, 2, 1, 0, 1],
        [1, 0, 1, 3, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 2, 0, 0, 2, 1, 0, 1],
        [1, 2, 1, 1, 0, 0, 1, 1, 2, 1],
        [1, 2, 2, 0, 0, 0, 0, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    for (let i = 0; i < map.length; i++) {
        let innerArray = map[i];
        for (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] == 1) {
                new Ice(j * 200, i * 200, 200, 200);
            }
            else if (innerArray[j] == 2) {
                new Fish(j * 200, i * 200, 200, 200);
            }
            else if (innerArray[j] == 3) {
                new Enemy(j * 200, i * 200, 150, 150);
            }
        }
    }
    global.playerObject = new Penguin(1000, 1600, 150, 150);
}
function winGame() {
    if (global.score >= 16) {
        alert("You won Level 1!");
        resetGame();
        currentLevel = 2;
        level2();
    }
}
function checkWinLevel2() {
    if (global.score >= 15) {
        alert("You won Level 2!");
        resetGame();
    }
}

function resetGame() {
    global.allGameObjects = []
    global.score = 0;
    scoreDisplay.textContent = `🐟: ${global.score}`;
    timeLeft = 120;
    setupGame();

    requestAnimationFrame(gameLoop);
}

setupGame();
requestAnimationFrame(gameLoop);
winGame();

function level2() {
    let gameStart = false;
    let timeLeft = 120;
    global.playerObject = {};
    global.allGameObjects = [];
    let timeInterval = setInterval(function() {
    timeLeft--;
    update();
    if (timeLeft <=0 && gameStart == true) {
        clearInterval(timeInterval);
        alert("Game Over! Time's up!");
    }
},1000);
let map2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 0, 0, 0, 0, 3, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 3, 0, 0, 0, 2, 2, 2, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 2, 2, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 2, 2, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 2, 2, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

for (let i = 0; i < map2.length; i++) {
    let innerArray = map2[i];
    for (let j = 0; j < innerArray.length; j++) {
        if (innerArray[j] == 1) {
            new Ice(j * 200, i * 200, 200, 200);
        }
        else if (innerArray[j] == 2) {
            new Fish(j * 200, i * 200, 230, 230);
        }
        else if (innerArray[j] == 3) {
            new Enemy(j * 200, i * 200, 150, 150);
        }
    }}
    global.playerObject = new Penguin(1000, 1625, 150, 150);
    
   
    }










