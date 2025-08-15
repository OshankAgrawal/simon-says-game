// Arrays to store game sequence and user sequence
let gameSeq = [];
let userSeq = [];

// Available button colors
let btns = ["yellow", "red", "purple", "green"];

// Game state variables
let started = false; // tracks if game has started
let lavel = 0; // current level number
let highScore = 0; // highest score for this session only

// Selecting the h2 element to update game status
let h2 = document.querySelector("h2");

function startGame() {
    if (!started) {
        console.log("Game Started");
        started = true;
        document.getElementById("startBtn").style.display = "none"; // hide start button
        lavelUP();
    }
}

// Start game on key press (desktop)
document.addEventListener("keypress", startGame);

// Start game on button click (mobile-friendly)
document.getElementById("startBtn").addEventListener("click", startGame);

// Function to flash a button for game sequence
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Function to flash a button when user clicks it
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

// Function to increase the level and generate new color in sequence
function lavelUP() {
    userSeq = []; // reset user sequence for new level
    lavel++; // increase level count
    h2.innerText = `Level ${lavel} | High Score: ${highScore}`;

    // Generate a random color from the btns array
    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);

    // Add random color to game sequence and flash it
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randombtn);
}

// Function to check user's answer at a given index
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // If the user has completed the sequence correctly
        if (userSeq.length === gameSeq.length) {
            setTimeout(lavelUP, 1000); // go to next level after delay
        }
    } else {
        // Update high score if beaten
        if (lavel > highScore) {
            highScore = lavel;
        }

        // Show Game Over message
        h2.innerHTML = `Game Over! Your score was <b>${lavel}</b> | High Score: ${highScore} <br> Press any key to start.`;

        // Flash red background on wrong answer
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);

        // Show start button again after game over
        document.getElementById("startBtn").style.display = "inline-block";

        // Reset the game variables
        reset();
    }
}

// Function to handle user button clicks
function btnPress() {
    let btn = this; // button clicked
    userFlash(btn); // flash effect

    let userColor = btn.getAttribute("id"); // get color from id
    userSeq.push(userColor); // add to user sequence

    // Check the user's answer so far
    checkAns(userSeq.length - 1);
}

// Add event listeners to all game buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Function to reset the game state
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    lavel = 0;
}
