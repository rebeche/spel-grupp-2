let hero = document.getElementById("hero");
let game = document.getElementById("game");

let bottom = 0;
let left = 0;

function jump () {
    let timer = setInterval(() => {
        bottom += 20;
        hero.style.bottom = bottom + "px";
        if (bottom >= 200) {
             clearInterval (timer);
            let down = setInterval(() => { 
                bottom -=20;
                hero.style.bottom = bottom + "px";   
            if (bottom <= 50) {
            clearInterval (down);
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
            //bottom += 100;
            break;

        case "s":
        case "ArrowDown":

            bottom -= 20;
            hero.style.bottom = bottom + "px";
            break;

        

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

let enemyId = 0;

function createEnemy() {
    enemyId++
    let enemy = document.createElement("div");
    enemy.innerHTML = "₿"
    enemy.classList = "enemy";
    let enemyLeft = 100;
    let enemyBottom = Math.round(Math.round(Math.random() * 500) / 10) * 10;
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

                let resurect = setInterval(() => {
                    hero.style.backgroundColor = "purple"
                    clearInterval(dead)
                }, 100)

            }, 100)


        }

        if (enemyLeft < 0) {
            clearInterval(move);
            enemy.remove();
            createEnemy();
        }

    }, 100)

    game.appendChild(enemy);
}

createEnemy();

//collision detection (hitboxen), 
//koppla collision till score
//skapa fiene och döpa om vår nuvarande fiende till BTC, eller döp nya til bank.
//fixa höjd på alla mynt