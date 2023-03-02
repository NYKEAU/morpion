const selectMenu = document.getElementById('selectMenu');
const game = document.getElementById('game');
const gameButtons = document.getElementById('gameButtons');

const playerOne = ['Player One', '<i class="fa-solid fa-x fa-7x"></i>'];
const playerTwo = ['Player Two', '<i class="fa-solid fa-o fa-7x"></i>'];

const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

let gameMode = 1;
let playerTurn = 1;

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = document.getElementById(winCondition[0]).innerHTML;
        const b = document.getElementById(winCondition[1]).innerHTML;
        const c = document.getElementById(winCondition[2]).innerHTML;
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            return true;
        }
    }
    return false;
}

window.onload = () => {
    selectMenu.style.display = 'block';
    game.style.display = 'none';
}

function selectGame(player) {
    selectMenu.style.display = 'none';
    game.style.display = 'flex';
    gameButtons.style.display = 'none';
    if (player === 1) {
        gameMode = 1;
        unblockCells();
    } else if (player === 2) {
        gameMode = 2;
        unblockCells();
    }
}

function onePlayer(cell) {
    if (checkDraw()) {
        blockCells();
        setTimeout(() => {
            alert('Match nul !');
        }, "100");
        gameButtons.style.display = 'flex';
        return;
    }
    playerSymbol = (playerTurn === 1) ? playerOne[1] : playerTwo[1];
    if (playerTurn === 1) {
        if (cell.innerHTML == '') {
            cell.innerHTML = playerSymbol;
            if (checkWin()) {
                blockCells();
                setTimeout(() => {
                    alert('Joueur ' + playerTurn + ' a gagné !');
                }, "100");
                gameButtons.style.display = 'flex';
                return;
            }
            playerTurn = (playerTurn === 1) ? 2 : 1;
            computerPlay();
        }
        else
            return;
    }
}

function computerPlay() {
    if (checkDraw()) {
        setTimeout(() => {
            alert('Match nul !');
        }, "100");
        gameButtons.style.display = 'flex';
        return;
    }
    console.log('Computer turn');
    playerSymbol = (playerTurn === 1) ? playerOne[1] : playerTwo[1];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = document.getElementById(winCondition[0]).innerHTML;
        const b = document.getElementById(winCondition[1]).innerHTML;
        const c = document.getElementById(winCondition[2]).innerHTML;
        if ((a === b && b === playerTwo[1] && c === '') ||
            (a === c && c === playerTwo[1] && b === '') ||
            (b === c && c === playerTwo[1] && a === '')) {
            const cell = document.getElementById(winCondition.find(c => document.getElementById(c).innerHTML === ''));
            cell.innerHTML = playerSymbol;
            if (checkWin()) {
                setTimeout(() => {
                    alert('Joueur ' + playerTurn + ' a gagné !');
                }, "100");
                blockCells();
                gameButtons.style.display = 'flex';
            } else {
                playerTurn = (playerTurn === 1) ? 2 : 1;
            }
            return;
        }
    }

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = document.getElementById(winCondition[0]).innerHTML;
        const b = document.getElementById(winCondition[1]).innerHTML;
        const c = document.getElementById(winCondition[2]).innerHTML;
        if ((a === b && b === playerOne[1] && c === '') ||
            (a === c && c === playerOne[1] && b === '') ||
            (b === c && c === playerOne[1] && a === '')) {
            const cell = document.getElementById(winCondition.find(c => document.getElementById(c).innerHTML === ''));
            cell.innerHTML = playerSymbol;
            playerTurn = (playerTurn === 1) ? 2 : 1;
            return;
        }
    }

    let randomCell = Math.floor(Math.random() * 9) + 1;
    let cell = document.getElementById(randomCell);
    while (cell.innerHTML !== '' && !checkDraw()) {
        randomCell = Math.floor(Math.random() * 9) + 1;
        cell = document.getElementById(randomCell);
    }
    cell.innerHTML = playerSymbol;
    if (checkWin()) {
        setTimeout(() => {
            alert('Joueur ' + playerTurn + ' a gagné !');
        }, "100");
        blockCells();
        gameButtons.style.display = 'flex';
    } else {
        playerTurn = (playerTurn === 1) ? 2 : 1;
    }
}


function twoPlayers(cell) {
    if (checkDraw()) {
        blockCells();
        setTimeout(() => {
            alert('Match nul !');
        }, "100");
        gameButtons.style.display = 'flex';
        return;
    }
    playerSymbol = (playerTurn === 1) ? playerOne[1] : playerTwo[1];
    if (cell.innerHTML == '') {
        cell.innerHTML = playerSymbol;
        if (checkWin()) {
            blockCells();
            setTimeout(() => {
                alert('Joueur ' + playerTurn + ' a gagné !');
            }, "100");
            gameButtons.style.display = 'flex';
            return;
        }
        playerTurn = (playerTurn === 1) ? 2 : 1;
    }
    else
        return;
}

function play(id) {
    const cell = document.getElementById(id);
    if (gameMode === 2)
        twoPlayers(cell);
    else if (gameMode === 1)
        onePlayer(cell);
}

function unblockCells() {
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(i);
        cell.style.pointerEvents = "auto";
        cell.innerHTML = '';
    }
}

function blockCells() {
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(i);
        cell.style.pointerEvents = "none";
    }
}

function reset() {
    unblockCells();
    gameButtons.style.display = 'none';
    playerTurn = 1;
}

function back() {
    selectMenu.style.display = 'block';
    game.style.display = 'none';
}

function checkDraw() {
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(i);
        if (cell.innerHTML === '')
            return false;
    }
    return true;
}