const board = document.getElementById("board");
const currentTurnDisplay = document.getElementById("current-turn");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");
const modal = document.getElementById("myModal");
const winnerMessage = document.getElementById("winner-message");
const playAgainButton = document.getElementById("play-again-button");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function checkWinner() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            gameOver = true;
            winnerMessage.textContent = `${boardState[a]} wins!`;
            highlightWinningCells(combo);
            modal.style.display = "block"; // Display the modal
            return;
        }
    }

    if (!gameOver && boardState.every(cell => cell !== "")) {
        gameOver = true;
        winnerMessage.textContent = "It's a draw!";
        modal.style.display = "block"; // Display the modal
        return;
    }
}

function highlightWinningCells(cells) {
    cells.forEach(index => {
        const cell = board.children[index];
        cell.style.backgroundColor = "#1abc9c";
    });
}

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(board.children).indexOf(cell);

    if (boardState[index] === "" && !gameOver) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        checkWinner();
    }
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    message.textContent = "";
    Array.from(board.children).forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#f0f0f0";
    });
}


function updateCurrentPlayerDisplay() {
    currentTurnDisplay.textContent = `Player ${currentPlayer} Turn`;
    currentTurnDisplay.style.color = "#14e7ff";
}

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(board.children).indexOf(cell);

    if (boardState[index] === "" && !gameOver) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateCurrentPlayerDisplay(); 
        checkWinner();
    }
}

playAgainButton.addEventListener("click", function() {
    modal.style.display = "none"; 
    restartGame(); 
});


updateCurrentPlayerDisplay();


createBoard();

restartButton.addEventListener("click", restartGame);