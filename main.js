const id = id => document.getElementById(id)
const throwingBoard = id("throwing-board")
let score = 0
let maxNumbers = 12

function setUpGame(_maxNumbers) {
    maxNumbers = _maxNumbers
    id("numbers").innerHTML = ""
    for (let i = 1; i < (maxNumbers + 1); i++) {
        id("numbers").innerHTML += `<div class="toggled-number">${i}</div>`
    }
    updateScore(0)
    const numberButtons = id("numbers").children
    for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].onclick = () => {
        if (!inPlay) return
        if (numberButtons[i].classList.contains("selected-number")) {
            totalValuesSelected -= i + 1
            numberButtons[i].classList.remove("selected-number")
            return
        }
        totalValuesSelected += i + 1
        if (currentNumber < totalValuesSelected) {
            navigator.vibrate([500])
            totalValuesSelected -= i + 1
        } else if (currentNumber > totalValuesSelected) {
            numberButtons[i].classList.toggle("selected-number")
        } else {
            let noOfNumbersRemoved = 0
            numberButtons[i].classList.toggle("selected-number")
            throwingBoard.innerHTML = "Click To Roll"
            throwingBoard.style.display = "flex "
            for (let i = 0; i < numberButtons.length; i++) {
                if (numberButtons[i].classList.contains("selected-number")) {
                    numberButtons[i].style.transform = "translateX(100px)"
                    noOfNumbersRemoved++
                }
            }
            if(noOfNumbersRemoved == maxNumbers){
                customAlert("MSG")
            }
            updateScore(noOfNumbersRemoved)
            rollable = true
            inPlay = false
        }
    }
}

}

let currentNumber;
let rollable = true;
let inPlay = false;
setUpGame(12)
id("throwing-board").addEventListener("click", () => {
    if (!rollable) return
    let choice1 = Math.ceil(Math.random() * 6)
    let choice2 = Math.ceil(Math.random() * 6)
    throwingBoard.style.display = "initial"
    let dice1HTML = `<div id="dice1">${choice1}</div>`
    let dice2HTML = `<div id="dice2">${choice2}</div>`
    throwingBoard.innerHTML = dice1HTML + dice2HTML
    let dice1 = id("dice1")
    let dice2 = id("dice2")

    // Position Dice1 Randomly
    let randomX = Math.floor(Math.random() * (throwingBoard.offsetWidth - dice1.offsetWidth));
    let randomY = Math.floor(Math.random() * (throwingBoard.offsetHeight - dice1.offsetHeight));

    dice1.style.left = randomX + "px";
    dice1.style.top = randomY + "px";

    dice1.style.transform = "rotate(" + Math.floor(Math.random() * 360); + "deg)";

    // Position Dice2 Randomly
    randomX = Math.floor(Math.random() * (throwingBoard.offsetWidth - dice2.offsetWidth));
    randomY = Math.floor(Math.random() * (throwingBoard.offsetHeight - dice2.offsetHeight));

    dice2.style.left = randomX + "px";
    dice2.style.top = randomY + "px";

    dice2.style.transform = "rotate(" + Math.floor(Math.random() * 360); + "deg)";
    currentNumber = choice1 + choice2
    totalValuesSelected = 0
    rollable = false
    inPlay = true
})

let totalValuesSelected = 0;




function updateScore(_score) {
    if(parseInt(localStorage["dicer-hi"]) < _score){
        localStorage["dicer-hi"] = _score
        id("hi-score").textContent = _score
    }
    score = _score
    id("score").textContent = score
}

id("give-up").onclick = () => {
    throwingBoard.innerHTML = "Click To Roll"
    throwingBoard.style.display = "flex "
    rollable = true
    inPlay = false
    totalValueSelected = 0
    setUpGame(12)
}

if(!localStorage["dicer-hi"]) localStorage["dicer-hi"] = 0
else id("hi-score").textContent = localStorage["dicer-hi"]