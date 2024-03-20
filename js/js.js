const CELLS = document.querySelectorAll(".cell");
const STATUS = document.querySelector("#status");
const RESTART_BTN = document.querySelector(".btn");
const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initilizeGame();

function initilizeGame() {
    CELLS.forEach(cell => cell.addEventListener("click", cellClicked))
    RESTART_BTN.addEventListener("click", restartGame)
    STATUS.textContent = `${currentPlayer}'s turn`
    running = true;
    console.log("game initilized")
}
function cellClicked() {
    const CELL_INDEX = this.getAttribute("cellIndex");

    if (options[CELL_INDEX] != "" || !running){
        return;
    }

    updateCell(this, CELL_INDEX);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    STATUS.textContent = `${currentPlayer}'s turn`
    console.log('palyer changed')
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
        const condition = WIN_CONDITIONS[i]
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        STATUS.textContent = `${currentPlayer} won`;
        running = false;
        console.log(`${currentPlayer} won`)
    } 
    else if (!options.includes("")) {
        STATUS.textContent = "DRAW!";
        running = false;
    }
    else {
        changePlayer()
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    STATUS.textContent = `${currentPlayer}'s turn`
    CELLS.forEach(cell => cell.textContent = "");
    running = true;
}