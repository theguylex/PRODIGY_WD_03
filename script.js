const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const toggleAiBtn = document.getElementById('toggleAiBtn');
let board = Array(9).fill(null);
let isPlayerX = true;
let gameOver = false;
let againstAI = false;

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

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartBtn.addEventListener('click', restartGame);
toggleAiBtn.addEventListener('click', toggleAiMode);

function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] || gameOver) return;

  placeMark(cell, index);
  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    if (againstAI && !gameOver) {
      aiMove();
    }
  }
}

function placeMark(cell, index) {
  board[index] = isPlayerX ? 'X' : 'O';
  cell.textContent = isPlayerX ? 'X' : 'O';
}

function swapTurns() {
  isPlayerX = !isPlayerX;
  setStatusText();
}

function setStatusText() {
  statusText.textContent = `Player ${isPlayerX ? 'X' : 'O'}'s turn`;
}

function checkWin() {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return board[index] && board[index] === (isPlayerX ? 'X' : 'O');
    });
  });
}

function isDraw() {
  return board.every(cell => cell !== null);
}

function endGame(draw) {
  gameOver = true;
  if (draw) {
    statusText.textContent = "It's a draw!";
  } else {
    statusText.textContent = `Player ${isPlayerX ? 'X' : 'O'} wins!`;
  }
}

function restartGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameOver = false;
  isPlayerX = true;
  setStatusText();
}

function toggleAiMode() {
  againstAI = !againstAI;
  toggleAiBtn.textContent = againstAI ? 'Play Against Player' : 'Play Against AI';
  restartGame();
}

function aiMove() {
  const availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  const aiCell = cells[randomIndex];

  placeMark(aiCell, randomIndex);
  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

setStatusText();