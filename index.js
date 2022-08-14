const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const winningMessage = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const restartButton = document.querySelector('.restartButton');

let circleTurn 

startGame();

function startGame() {
    circleTurn = false;
    board.classList.add(X_CLASS) 
    cells.forEach(cell => cell.addEventListener('click', handleClick, {once: true}));
}


function handleClick (event) {
    const cell = event.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (ckeckWin(currentClass)){
        winningMessage.classList.add('show');
        if (currentClass == CIRCLE_CLASS) {
            winningMessageText.innerText = 'Circle Wins';
        } else {
            winningMessageText.innerText = 'X Wins';
        }
        restartButton.addEventListener('click', () => {
            winningMessage.classList.remove('show');
            startGame();
        })
        cells.forEach(cell => {
            cell.classList.remove(CIRCLE_CLASS);
            cell.classList.remove(X_CLASS);
        })
    } else if (isDraw()) {
        winningMessage.classList.add('show'); 
        winningMessageText.innerText = 'Draw!!';
        restartButton.addEventListener('click', () => {
            winningMessage.classList.remove('show');
            startGame();
        })
        cells.forEach(cell => {
            cell.classList.remove(CIRCLE_CLASS);
            cell.classList.remove(X_CLASS);
        })
    } else {
        swapturns();
    }
    
};

function placeMark (cell, currentClass) {
    cell.classList.add(currentClass);
};

function swapturns () {
    board.classList.remove(circleTurn ? CIRCLE_CLASS : X_CLASS);
    circleTurn = !circleTurn;
    board.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS)    
};

function ckeckWin(currentClass) {
    return WINNING_COMBINATIONS.some( combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
};

function isDraw () {
    console.log(cells)
    console.log([...cells])
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS) 
    })
}

