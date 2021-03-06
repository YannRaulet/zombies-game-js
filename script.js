// const
const canvas    = document.getElementById('canvas');
const score     = document.getElementById('score');
const shots      = document.getElementById('shots');
const endScreen = document.getElementById('endScreen');

shotsLeft        = 60;
// number of zombies from which there is a game over
gameOverNumber  = 50;                    
loopPlay        = false;

// Easy mode button onclick
function startEasyMode() {
    count           = 0;
    // starts at 6 seconds
    getFaster       = 6000;
    // restart game, reset everything
    shotsRemaining   = shotsLeft;                     

    canvas.innerHTML    = '';
    // injects the score into the HTML
    score.innerHTML     = count;                    
    shots.innerHTML      = shotsRemaining;

    // make sure to not play loop several times
    loopPlay ? '' : game();
    loopPlay    = true;

    // Game mechanics
    function game() {
        let randomTime = Math.round(Math.random() * getFaster);
        // if spawn speed > 0.7 seconds, zombie spawns 10% faster each time
        getFaster > 700 ? getFaster = (getFaster * 0.9): '';

        setTimeout(() => {
            if (shotsRemaining === 0) {
                youWin();
            //childElementCount : zombie number count on screen
            } else if (canvas.childElementCount < gameOverNumber) { 
                zombiePop();
                game();    // game : allows you to relaunch the appearance of zombies
            } else {
                gameOver();
            }
        }, randomTime);    // random zombie spawn
    };

    const gameOver = () => {
        endScreen.innerHTML = `<div class="gameOver">Game Over <br> Score : ${count}</div>`;    // game over screen
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = 1;
        loopPlay = false;
    }

    const youWin = () => {
        let accuracy = Math.round(count / shotsLeft * 100);
        endScreen.innerHTML = `<div class="youWin">Congratulation !! <br><span>Precision : ${accuracy}%</span></div>`;    // affichage game over
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = 1;
        loopPlay = false;
    }
}

// Hard mode button onclick
function startHardMode() {
    count           = 0;
    getFaster       = 4000;
    shotsRemaining   = shotsLeft;                     

    canvas.innerHTML    = '';
    score.innerHTML     = count;                    
    shots.innerHTML      = shotsRemaining;

    loopPlay ? '' : game();
    loopPlay    = true;

    function game() {              
        let randomTime = Math.round(Math.random() * getFaster);
        // if spawn speed > 0.6 seconds, zombie spawns 40% faster each time
        getFaster > 600 ? getFaster = (getFaster * 0.6): '';    

        setTimeout(() => {
            if (shotsRemaining === 0) {
                youWin();
            } else if (canvas.childElementCount < gameOverNumber) { 
                zombiePop();
                game();    
            } else {
                gameOver();
            }
        }, randomTime);
    };

    const gameOver = () => {
        endScreen.innerHTML = `<div class="gameOver">Game Over <br> Score : ${count}</div>`;    // affichage game over
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = 1;
        loopPlay = false;
    }

    const youWin = () => {
        let accuracy = Math.round(count / shotsLeft * 100);
        endScreen.innerHTML = `<div class="youWin">Congratulation !! <br><span>Precision : ${accuracy}%</span></div>`;    // affichage game over
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = 1;
        loopPlay = false;
    }
}

function zombiePop() {
    let zombie = new Image();    //img src
    zombie.src = "./pictures/zombie.png";

    zombie.classList.add('zombie');                          // set class 'zombie' for each zombie that pops
    zombie.style.top = Math.random() * 400 + 'px';           // random pop on red screen: 400 size height canva
    zombie.style.left = Math.random() * 350 + 'px';          // random pop on red screen: 300 size width canva

    let x, y;
    x = y = (Math.random() * 30) + 40;                       // zombie random size (at min 40px, max 70)

    zombie.style.setProperty('--widthX', `${ x }px`);        // injects into CSS value of widthX: height class zombie sass
    zombie.style.setProperty('--heightY', `${ y }px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1;

    let trX = Math.random() * 400 * plusMinus;
    let trY = Math.random() * 350 * plusMinus;
    zombie.style.setProperty('--trX', `${ trX }%`);
    zombie.style.setProperty('--trY', `${ trY }%`);

    canvas.appendChild(zombie);                             // zombie child of canvas
}

//remove element clicked
document.addEventListener('click', (e) => {
    let targetElement = e.target || e.srcElement;           // defines the targeted element when clicked

    console.log(targetElement);
    if (targetElement.classList.contains('zombie')) {
        targetElement.remove();
        count++;
        score.innerHTML = count;                            // where is the counter stored                 
    };
})

//countdown click
canvas.addEventListener('click', () => {
    if(shotsRemaining >0) {
        shotsRemaining--;
        shots.innerHTML = shotsRemaining;
    }
});

/* the game restarts after 0.5 s
when click on game over or success window
*/
endScreen.addEventListener('click', () => {
    setTimeout(() => {
        startEasyMode();
        startHardMode();
        endScreen.style.opacity = '0';
        endScreen.style.visibility = 'hidden';
    }, 500)
});
