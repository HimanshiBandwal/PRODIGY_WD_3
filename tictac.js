
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const scoreboardX = document.querySelector('.x-score');
const scoreboardO = document.querySelector('.o-score');
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const turnIndicator = document.getElementById('turnIndicator');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let score = { X: 0, O: 0 };

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] !== '' || checkWinner(gameBoard)) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add class based on currentPlayer

    if (checkWinner(gameBoard)) {
        winnerMessage.textContent = `${currentPlayer} wins!`;
        score[currentPlayer]++;
        updateScoreboard();
        openModal();
    } else if (gameBoard.every(cell => cell !== '')) {
        winnerMessage.textContent = 'Draw!';
        openModal();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnIndicator.textContent = `${currentPlayer}'s Turn`;
    }
}

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove classes
    });
    currentPlayer = 'X';
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
    winnerMessage.textContent = '';
    closeModal();
}

function updateScoreboard() {
    scoreboardX.textContent = `X: ${score.X}`;
    scoreboardO.textContent = `O: ${score.O}`;
}

function openModal() {
    winnerModal.style.display = 'flex';
}

function closeModal() {
    winnerModal.style.display = 'none';
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
winnerModal.addEventListener('click', closeModal);


