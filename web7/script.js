const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
const cells = new Array(9).fill(null);

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

function checkWinner() {
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }

    }
    if (cells.every(cell => cell !== null)) {
        return 'T'; 
    }
    return null; 
}

function handleCellClick(index) {
    if (!cells[index] && !checkWinner()) {
        
        cells[index] = currentPlayer;
        
        renderBoard();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      
        const winner = checkWinner();
        
        if (winner) {
            if (winner === 'T') {
                status.textContent = 'It\'s a Tie!';
            } else {
                status.textContent = `Player ${winner} wins!`;
            }
        }
    }
}


function renderBoard() {
    cells.forEach((cell, index) => {
        const cellElement = board.children[index];
        cellElement.textContent = cell;
    });
}


board.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
        const index = e.target.getAttribute('data-index');
        handleCellClick(index);
    }
});


resetButton.addEventListener('click', () => {
    cells.fill(null);
    renderBoard();
    status.textContent = '';
    currentPlayer = 'X';
});


renderBoard();

const toggleDarkModeButton = document.getElementById("toggleDarkMode");
let isDarkMode = false;

toggleDarkModeButton.addEventListener("click", function () {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        board.classList.add("dark-mode");
    } else {
        board.classList.remove("dark-mode");
    }
});
