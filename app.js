let gameSeq = [];
let userSeq = [];
const btns = ["red", "blue", "green", "yellow"];//for random btn flash
let started = false;
let level = 0;
const h2 = document.querySelector(".h2");

window.addEventListener("keydown", function (e) {
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelUp();
        const allBtns = document.querySelectorAll(".box")
        for (let btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }
    }
});
console.log("hi");


// for button flash
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 200)
}
// for level count
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random button flash
    let randIdx = Math.floor(Math.random() * 4)
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    console.log(gameSeq);
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
}

// to chack the sequence
function checkAns(idx) {
    // let idx = level-1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b> ${level}</b>.<br> Press any key to start `;
        h2.parentElement.classList.add("gameOverFlash");
        setTimeout(function () {
            h2.parentElement.classList.remove("gameOverFlash")
        }, 250)
        reset();
    }
}

// for button press
function btnPress() {
    let btn = this;
    btnFlash(btn);
    // let userColor = btn.getAttribute("class") both are giving 3 class name so we give id and select that
    // userSeq.push(btn.className); 
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// for Reset aur restart game
function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}