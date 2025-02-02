import { global } from "./global.js";


function move(event) {
    switch(event.key) {
        case "d":
            global.playerObject.switchCurrentSprites(3, 5);
            global.playerObject.xVelocity = 350;
            global.playerObject.yVelocity = 0;
            break;
        case "a":
            global.playerObject.switchCurrentSprites(6, 8);
            global.playerObject.xVelocity = -350;
            global.playerObject.yVelocity = 0;
            break;
        case "w":
            global.playerObject.switchCurrentSprites(9, 11);
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = -350;
            break;
        case "s":
            global.playerObject.switchCurrentSprites(0, 2);
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 350;
            break;
    } 
}

function stop() {
    global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0;
}

document.addEventListener("keypress", move);
document.addEventListener("keyup", stop);