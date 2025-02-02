import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Fish {
    active = true;
    name = "Fish";
    x = 100;
    y = 500;
    previousX = 0;
    previousY = 0;
    width = 50;
    height = 50;
    score = 0;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
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
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };

    update = function () { 

    };

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };

    loadImages = function () {
        let image1 = new Image();
        image1.src = "./images/fish.png";

        this.animationData.animationSprites.push(image1);
    };


    reactToCollision = function(collidingObject) {
        switch (collidingObject.name) {
            case "Penguin": 
                global.score ++;
                scoreDisplay.textContent = `🐟: ${global.score}`
                this.active = false;
                break;
        }
    }

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.previousX = x;
        this.previousY = y;
        this.loadImages();
        global.allGameObjects.push(this);
    }

}

export {Fish}