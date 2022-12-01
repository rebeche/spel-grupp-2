const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 2000;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 4;

let hero = document.getElementById("hero");
let game = document.getElementById("game");
let gameOver = document.getElementById("gameOver");
let scoreDiv = document.getElementById("scoreDiv");

gameOver.style.display = "none";

let bottom = 50;
let left = 500;
let score = 0;

const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer3.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer4.png'
const backgroundLayer7 = new Image();
backgroundLayer7.src = 'layer7.png'

class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier; //Kopplas till globala speed
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }

}

const layer3 = new Layer(backgroundLayer3, 0.3);
const layer4 = new Layer(backgroundLayer4, 0.6);
const layer7 = new Layer(backgroundLayer7, 0);

const gameObjects = [, layer4, layer7, layer3];

function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
    object.update();
    object.draw();
})
    requestAnimationFrame(animate);

};
animate();

function jump() {
    let timer = setInterval(() => {
        bottom += 10;
        hero.style.bottom = bottom + "px";
        if (bottom >= 300) {
            clearInterval(timer);
            let down = setInterval(() => {
                bottom -= 10;
                hero.style.bottom = bottom + "px";
                if (bottom <= 50) {
                    clearInterval(down);
                }
            }, 100);
        }
    }, 100);
}

document.addEventListener("keyup", (e) => {
    //console.log("e", e.key);

    //hero movement//
    switch (e.key) {
        case "w":
        case "ArrowUp":
            jump();
            break;
    }
})

let BtcId = 0;

function createBtc() {
    BtcId++
    let Btc = document.createElement("div");
    Btc.innerHTML = "₿"
    Btc.classList = "Btc";
    let BtcLeft = 1400;
    let BtcBottom = (Math.round(Math.round(Math.random() * 280) / 10) * 10) + 100;

    Btc.style.left = BtcLeft + "px";
    Btc.style.bottom = BtcBottom + "px";
    Btc.id = BtcId;

    let move = setInterval(() => {
        BtcLeft -= 15;
        Btc.style.left = BtcLeft + "px";

        if (BtcLeft > left && BtcLeft < left + 100 &&
            BtcBottom > bottom && BtcBottom < bottom+100)
        {
        console.log("hit");
        Btc.remove();
        score++;
        scoreDiv.innerHTML = "Score " + score;
        }
        else {
            if (BtcLeft < 0) {
                clearInterval(move);
                Btc.remove();
            }
        }            
    }, 100)
    game.appendChild(Btc);
}

let createBtcs = setInterval(() => {
    createBtc();
}, 1000);

let enemyId = 0;
function createEnemy() {
    enemyId++
    let enemy = document.createElement("div");
    enemy.classList = "enemy";
    let enemyLeft = 1400;
    let enemyBottom = 60;

    enemy.style.left = enemyLeft + "px";
    enemy.style.bottom = enemyBottom + "px";
    enemy.id = enemyId;

    let move = setInterval(() => {
        enemyLeft -= 100;
        enemy.style.left = enemyLeft + "px";

        if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
            console.log("HIT");            
            hero.style.backgroundColor = "red";
            clearInterval(createEnemies);
            clearInterval(createBtcs);
            clearInterval(move);
            gameOver.style.display = "block";
            gameOver.innerHTML = "Game Over";

        }
        if (enemyLeft < 0) {
            clearInterval(move);
            enemy.remove();
        }

    }, 100)
    game.appendChild(enemy);
}

let createEnemies = setInterval(() => {
    createEnemy();

}, 4000);


//collision detection (hitboxen), 


        // bottom på janne+höjden < bottom på btc 
        // left på janne+bredden < left på btc 
        // bottom på janne > bottom på btc+höjden 
        // left på janne > left på btc+bredden
            
            // left = x bottom = y

            //  Gamla varianten: // bottom + 100 < BtcBottom || //btc ska kunna gå över janne
                    // left + 100 < BtcLeft || //btc ska kunna gå höger om janne
                    // bottom > BtcBottom + 50 || //btc ska kunna gå under janne
                    // left > BtcLeft + 50) //btc ska kunna gå vänster om janne