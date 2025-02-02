import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js"

class Penguin extends BaseGameObject{
    active = true;
    name = "Penguin";
    x = 100;
    y = 300;
    previousX = 0;
    previousY = 0;
    xVelocity = 250;
    yVelocity = 250;
    width = 150;
    height = 150;
   
    animationData = {
        "animationSprites": [],
        "timePerAnimationSprite": 0.3,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    storePositionOfPreviousFrame = function () {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    getBoxBounds = function () {
        let bounds =  {
            "left": this.x,
            "right": this.x + this.width,
            "top": this.y,
            "bottom": this.y + this.height
        }
        return bounds;
    }

    update = function () { 
        this.x += this.xVelocity * global.deltaTime; 
        this.y += this.yVelocity * global.deltaTime;
        this.screenWrap();
    }

    draw = function () {
        let spriteToDraw = this.getNextSprite();
        global.ctx.drawImage(spriteToDraw, this.x, this.y, this.width, this.height);
    }

    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerAnimationSprite) {
            this.animationData.currentSpriteElapsedTime = 0;
            this.animationData.currentSpriteIndex++;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex;
            }
        }
        
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    }

    screenWrap = function () {
        let canvasBounds = global.getCanvasBounds();
        let penguinBounds = this.getBoxBounds();
        if (penguinBounds.left >= canvasBounds.right) {
            this.x = canvasBounds.left - this.width;
        }
        else if (penguinBounds.right <= canvasBounds.left) {
            this.x = canvasBounds.right;
        }
        else if (penguinBounds.bottom <= canvasBounds.top) {
            this.y = canvasBounds.bottom;
        }
        else if (penguinBounds.top >= canvasBounds.bottom) {
            this.y = canvasBounds.top - this.height;
        }
    }

    reactToCollision = function(collidingObject) {
        switch (collidingObject.name) {
            case "Ice":
                this.xVelocity = 0;
                this.yVelocity = 0;
                this.x = this.previousX;
                this.y = this.previousY;
                break;
            case "Enemy":
            this.active = false;
            alert("You just died! :((")
            restartButton.style.display = "block";
        }
    }
    constructor(x, y, width, height) {
        super(x, y,width, height )
        this.previousX = x;
        this.previousY = y;
        global.allGameObjects.push(this);
        this.loadImagesFromSpritesheet("../images/spritesheet.png", 3, 4);
    }
}
export { Penguin}