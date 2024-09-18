let gameSeq = [];
let userSeq = [];
const btns = ["red", "blue", "green", "yellow"];//for random btn flash
let started = false;
let level = 0;
let highestScore = [];
const h3 = document.querySelector(".h3");
const startBtn = document.querySelector(".start");
console.log(h3);

startBtn.addEventListener("touchstart",startGame);
window.addEventListener("keydown",startGame);
function startGame(e){
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelUp();
            const allBtns = document.querySelectorAll(".allBtns")
            for (let btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }
    }
};

// for button flash
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 200)
}
// for level count
function levelUp() {
    userSeq = []; //Reset UserSeq
    level++;
    h3.innerText = `Level ${level}`;

    // random button flash
    let randIdx = Math.floor(Math.random() * 4)
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    console.log( "gameseq "+gameSeq);
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
}

// to chack the sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1500);
        }
    } else {
        console.log("game over");
        
        h3.innerHTML = `Game Over! Your score was <b> ${level}</b>.<br> Prese key to start `;
        h3.parentElement.classList.add("gameOverFlash");
        setTimeout(function () {
            h3.parentElement.classList.remove("gameOverFlash")
        }, 250);
        reset();
    }
}

// for button press
function btnPress() {
    let btn = this;
    btnFlash(btn);
    // let userColor = btn.getAttribute("class") both are giving 3 classes so we gave id and select that
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("user seq"+userSeq);
    
    checkAns(userSeq.length - 1);
}

// for Reset aur restart game
function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    const allBtns = document.querySelectorAll(".allBtns")
    for (let btn of allBtns) {
    btn.removeEventListener("click", btnPress);
}
 }
