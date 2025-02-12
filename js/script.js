import { getData, getText } from "../topics/CorruptionIndex/db.js"; // Change selected pack


const data = getData();
const text = getText();

const leftSide = document.getElementById("left-side");
const leftName = document.getElementById("left-name");
const leftval = document.getElementById("left-val");

const rightSide = document.getElementById("right-side");
const rightName = document.getElementById("right-name");
const rightval = document.getElementById("right-val");

const rightThan = document.getElementById("right-than");

const higherBtn = document.getElementById("higher-btn");
const lowerBtn = document.getElementById("lower-btn");

const borderLine = document.getElementById("border-line");
const versus = document.getElementById("versus");
const versusText = document.getElementById("versus-text");

const rightIcon = document.getElementById("right-icon");
const wrongIcon = document.getElementById("wrong-icon");

const scoreTag = document.getElementById("score");
const highScoreTag = document.getElementById("high-score");

const restartBtn = document.getElementById("restart-btn");

let leftRand = getRandomObject();
let rightRand = getRandomObject();

let highScore = 0;
let score = 0;

if (!localStorage.getItem("higherlower-highscore")) {
    localStorage.setItem("higherlower-highscore", highScore);
}

highScore = localStorage.getItem("higherlower-highscore");

// Load text for pack
const left_dif_verb_tag = document.querySelector(".left_dif_verb");
const right_dif_verb_tag = document.querySelector(".right_dif_verb");

left_dif_verb_tag.innerHTML = text.left_dif_verb;
right_dif_verb_tag.innerHTML = text.right_dif_verb;

higherBtn.innerHTML = text.higher_btn;
lowerBtn.innerHTML = text.lower_btn;

document.getElementById("right-than").innerHTML = text.than + " ";

restartBtn.innerHTML = text.play_again;



while (rightRand.Name == leftRand.Name) {
    rightRand = getRandomObject();
}

function getRandomObject() {
    const keys = Object.keys(data);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    data[randomKey].Name = randomKey;
    let oldData = data[randomKey];
    delete data[randomKey];

    return oldData;
}

function changeScore(operation) {
    if (operation == "add") {
        score += 1;

        scoreTag.innerHTML = "Score: " + score;

        if (score > highScore) {
            highScore = score;

            localStorage.setItem("higherlower-highscore", highScore);

            highScoreTag.innerHTML = "Highscore: " + highScore;
        }
    } else if (operation == "reset") {
        score = 0;

        scoreTag.innerHTML = "Score: 0";
    }
}

function updateSides() {
    leftRand = rightRand;

    changeSide("left", leftRand);

    rightRand = getRandomObject();

    while (rightRand.Name == leftRand.Name) {
        rightRand = getRandomObject();
    }

    higherBtn.style.display = "block";
    lowerBtn.style.display = "block";
    rightThan.style.display = "block";
    rightval.innerHTML = "";
    rightval.style.display = "none";

    borderLine.style.backgroundColor = "#ffffff";
    versus.style.backgroundColor = "#ffffff";
    versusText.style.display = "block";
    rightIcon.style.display = "none";

    changeSide("right", rightRand);
}

function changeSide(side, object) {
    if (side == "left") {
        leftName.innerHTML = object.Name;
        leftval.innerHTML = object.val;
        leftSide.style.background = `linear-gradient(0deg, rgb(36 35 36 / 53%), rgb(96 96 96 / 35%)), url(./topics/${text.module_name}/img/${object.imageURL})`;
    } else if (side == "right") {
        rightName.innerHTML = object.Name;
        rightSide.style.background = `linear-gradient(0deg, rgb(36 35 36 / 53%), rgb(96 96 96 / 35%)), url(./topics/${text.module_name}/img/${object.imageURL})`;

        rightThan.innerHTML = text.than + ' "' + leftName.innerHTML + '"';
    }
}

higherBtn.addEventListener("click", () => {
    let leftvalNum = parseFloat(leftval.innerHTML.replace(",", ".").replace("€", ""));
    let rightvalNum = parseFloat(rightRand.val.replace(",", ".").replace("€", ""));

    if (leftvalNum <= rightvalNum) {
        changeScore("add");

        higherBtn.style.display = "none";
        lowerBtn.style.display = "none";
        rightThan.style.display = "none";
        rightval.innerHTML = rightRand.val;
        rightval.style.display = "block";

        borderLine.style.backgroundColor = "#59ac51";
        versus.style.backgroundColor = "#59ac51";
        versusText.style.display = "none";
        rightIcon.style.display = "flex";
        rightIcon.style.color = "#ffffff";

        setTimeout(() => {
            updateSides();
        }, 900);
    } else {
        higherBtn.style.display = "none";
        lowerBtn.style.display = "none";
        rightThan.style.display = "none";
        rightval.innerHTML = rightRand.val;
        rightval.style.display = "block";

        borderLine.style.backgroundColor = "#c75555";
        versus.style.backgroundColor = "#c75555";
        versusText.style.display = "none";
        wrongIcon.style.display = "flex";
        wrongIcon.style.color = "#ffffff";

        onGameOver();
    }
});

lowerBtn.addEventListener("click", () => {
    let leftvalNum = parseFloat(leftval.innerHTML.replace(",", ".").replace("€", ""));
    let rightvalNum = parseFloat(rightRand.val.replace(",", ".").replace("€", ""));

    if (leftvalNum < rightvalNum) {
        higherBtn.style.display = "none";
        lowerBtn.style.display = "none";
        rightThan.style.display = "none";
        rightval.innerHTML = rightRand.val;
        rightval.style.display = "block";

        borderLine.style.backgroundColor = "#c75555";
        versus.style.backgroundColor = "#c75555";
        versusText.style.display = "none";
        wrongIcon.style.display = "flex";
        wrongIcon.style.color = "#ffffff";

        onGameOver();
    } else {
        changeScore("add");

        higherBtn.style.display = "none";
        lowerBtn.style.display = "none";
        rightThan.style.display = "none";
        rightval.innerHTML = rightRand.val;
        rightval.style.display = "block";

        borderLine.style.backgroundColor = "#59ac51";
        versus.style.backgroundColor = "#59ac51";
        versusText.style.display = "none";
        rightIcon.style.display = "flex";
        rightIcon.style.color = "#ffffff";

        setTimeout(() => {
            updateSides();
        }, 900);
    }
});

restartBtn.addEventListener("click", () => {
    location.reload();
});

function onGameOver() {
    restartBtn.style.display = "block";
}

// Setup

changeSide("left", leftRand);
changeSide("right", rightRand);

highScoreTag.innerHTML = "Highscore: " + highScore;