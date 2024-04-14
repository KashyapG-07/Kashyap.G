const cells = document.querySelectorAll('.cell');
const messageEl = document.getElementById('message');
const undoBtn = document.getElementById('undo');
const resetBtn = document.getElementById('reset');
const modeSelect = document.getElementById('mode');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let undoAvailable = false;

// Function to handle cell click
// Function to handle cell click
// Function to handle cell click
function handleCellClick(cellIndex) {
    if (gameOver || gameBoard[cellIndex] !== '') {
        return;
    }

    if (currentPlayer === 'X') {
        gameBoard[cellIndex] = 'X'; // User 1 plays as X
    } else {
        gameBoard[cellIndex] = 'O'; // User 2 plays as O
    }
    cells[cellIndex].textContent = currentPlayer;

    if (checkWinner()) {
        gameOver = true;
        messageEl.textContent = `${currentPlayer} Wins!`;
        return;
    }

    if (isBoardFull()) {
        gameOver = true;
        messageEl.textContent = 'Draw!';
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
  
  // Minimax AI implementation for single player mode
  function makeAIMove() {
    const bestMove = findBestMove(gameBoard);
    gameBoard[bestMove] = 'O';
    cells[bestMove].textContent = 'O';
    undoAvailable = true;
  
    if (checkWinner()) {
      gameOver = true;
      messageEl.textContent = 'AI Wins!';
    } else if (isBoardFull()) {
      gameOver = true;
      messageEl.textContent = 'Draw!';
    }
  }
  
  
// Function to check for winner
function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
      return true;
    }
  }

  return false;
}

// Function to check if the board is full
function isBoardFull() {
  return gameBoard.every(cell => cell !== '');
}

// Reset game function
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    cells.forEach(cell => cell.textContent = '');
    messageEl.textContent = '';
}
// Function to handle undo
function undoMove() {
  if (!undoAvailable) {
    return;
  }

  const lastMoveIndex = gameBoard.lastIndexOf(currentPlayer);
  gameBoard[lastMoveIndex] = '';
  cells[lastMoveIndex].textContent = '';
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  undoAvailable = false;
}

// Event listeners for cell clicks, reset button, and mode selection
cells.forEach(cell => cell.addEventListener('click', () => handleCellClick(parseInt(cell.dataset.cellIndex))));
resetBtn.addEventListener('click', resetGame);
modeSelect.addEventListener('change', () => {
    resetGame(); // Reset game when mode changes
});

// Minimax algorithm function
function findBestMove(board) {
  let bestScore = -Infinity;
  let bestMoveIndex = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      const score = miniMax(board, false); // Simulate O's move and minimize score for X
      board[i] = ''; // Undo the move

      if (score > bestScore) {
        bestScore = score;
        bestMoveIndex = i;
      }
    }
  }

  return bestMoveIndex;
}

function miniMax(board, isMaximizingPlayer) {
    // Check for terminal states (win, lose, or draw)
    if (checkWinner()) {
        const winner = gameBoard[0] === 'X' ? 'X' : 'O';
        if (winner === 'X') {
            return -10; // Loss for O (maximizing player)
        } else if (winner === 'O') {
            return 10; // Win for O (maximizing player)
        } else {
            return 0; // Draw
        }
    } else if (isBoardFull()) {
        return 0; // Draw
    }

    let score;
    if (isMaximizingPlayer) {
        score = -Infinity; // Initialize score for maximizing player
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O'; // Simulate O's move
                const moveScore = miniMax(board, false); // Recursively call for minimizing player
                board[i] = ''; // Undo the move
                score = Math.max(score, moveScore);
            }
        }
    } else {
        score = Infinity; // Initialize score for minimizing player
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X'; // Simulate X's move
                const moveScore = miniMax(board, true); // Recursively call for maximizing player
                board[i] = ''; // Undo the move
                score = Math.min(score, moveScore);
            }
        }
    }

    return score;
}

