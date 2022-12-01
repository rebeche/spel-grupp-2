const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 2000;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 5;

let hero = document.getElementById("hero");
let game = document.getElementById("game");
let scoreDiv = document.getElementById("scoreDiv");

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

const layer3 = new Layer(backgroundLayer3, 0.5);
const layer4 = new Layer(backgroundLayer4, 0.3);
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
        bottom += 1;
        hero.style.bottom = bottom + "px";
        if (bottom >= 300) {
            clearInterval(timer);
            let down = setInterval(() => {
                bottom -= 1;
                hero.style.bottom = bottom + "px";
                if (bottom <= 50) {
                    clearInterval(down);
                }
            }, 1);
        }
    }, 1);
}

document.addEventListener("keyup", (e) => {
    //console.log("e", e.key);

    //hero movement//
    switch (e.key) {
        case "w":
        case "ArrowUp":
            jump();
            //bottom += 100;
            break;

        // case "s":
        //case "ArrowDown":

        // bottom -= 20;
        //hero.style.bottom = bottom + "px";
        //break;



        // TODO: BUGG i hitbox när vi rört oss i sidled

        // case "d":
        // case "ArrowRight":
        //     left += 20;
        //     hero.style.left = left + "px";
        // break;

        // case "a":
        // case "ArrowLeft":
        //     left -= 20;
        //     hero.style.left = left + "px";
        // break;

    }
})

let BtcId = 0;

function createBtc() {
    BtcId++
    let Btc = document.createElement("div");
    Btc.innerHTML = "₿"
    Btc.classList = "Btc";
    let BtcLeft = 100;
    let BtcBottom = (Math.round(Math.round(Math.random() * 280) / 10) * 10) + 100;
    //console.log(BtcBottom);
    // Math.round(Math.floor(Math.random() * (500 - 1)/10)*10)

    Btc.style.left = BtcLeft + "%";
    Btc.style.bottom = BtcBottom + "px";
    Btc.id = BtcId;

    let move = setInterval(() => {
        BtcLeft -= 1;
        Btc.style.left = BtcLeft + "%";

        // bottom på janne+höjden < bottom på btc 
        // left på janne+bredden < left på btc 
        // bottom på janne > bottom på btc+höjden 
        // left på janne > left på btc+bredden

        if (bottom + 100 < BtcBottom || //btc ska kunna gå över janne
            left + 100 < BtcLeft || //btc ska kunna gå höger om janne
            bottom > BtcBottom + 50 || //btc ska kunna gå under janne
            left > BtcLeft + 50) //btc ska kunna gå vänster om janne
        {
            console.log("no hit");
        }
        else {
            console.log("HIT");
            score++;
            scoreDiv.innerHTML = "Score " + score;
            Btc.remove();
        }
    }, 100)

    if (BtcLeft < 0) {
        clearInterval(move);
        Btc.remove();
    }

    game.appendChild(Btc);
}


setInterval(() => {
    createBtc();

}, 1000);


let enemyId = 0;

function createEnemy() {
    enemyId++
    let enemy = document.createElement("div");
    enemy.classList = "enemy";
    let enemyLeft = 100;
    let enemyBottom = 30;
    //console.log(enemyBottom);
    // Math.round(Math.floor(Math.random() * (500 - 1)/10)*10)


    enemy.style.left = enemyLeft + "%";
    enemy.style.bottom = enemyBottom + "px";
    enemy.id = enemyId;

    let move = setInterval(() => {
        enemyLeft -= 1;
        enemy.style.left = enemyLeft + "%";

        if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
            console.log("HIT");

            let dead = setInterval(() => {
                hero.style.backgroundColor = "red";

                let resurrect = setInterval(() => {
                    hero.style.backgroundColor = "purple"
                    clearInterval(dead)
                }, 100)

            }, 100)

        }
        if (enemyLeft < 0) {
            clearInterval(move);
            enemy.remove();
        }

    }, 100)

    game.appendChild(enemy);
}

//setInterval(() => {
  //  createEnemy();

//}, 4000);


//collision detection (hitboxen), 
