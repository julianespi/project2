document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector("div.gridItemContainer")
    const buttons = document.querySelectorAll("button")
    const newGameBtn = document.getElementById('newGameBtn');
    const localStorageKey = 'playerMode';

    let gameState = initializeGameState();
    let gameIsOver = false;

    function initializeGameState() {
        const savedState = localStorage.getItem(localStorageKey);
        return savedState ? JSON.parse(savedState) : createEmptyGameState();
    }

    function createEmptyGameState() {
        const rows = 6;
        const cols = 7;
        const emptyBoard = Array.from({ length: rows }, () => Array(cols).fill(0));
        return { board: emptyBoard, currentPlayer: 1 };
    }

    function saveGameState() {
        localStorage.setItem(localStorageKey, JSON.stringify(gameState));
    }

    function renderBoard() {
        let display = '';

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                const cellValue = gameState.board[i][j];
                display += `<div class="gridItem" id="player${cellValue}">${cellValue === 0 ? '' : cellValue}</div>`;
            }
        }

        grid.innerHTML = display;
    }

    function newGame() {
        // Reset the game state to its initial values
        gameState = createEmptyGameState();
        renderBoard();
        saveGameState();
        gameIsOver = false;
    }




    function checkForWin(player) {


        //Check for horizontal win
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col <= 3; col++) {
                if (
                    gameState.board[row][col] === player &&
                    gameState.board[row][col + 1] === player &&
                    gameState.board[row][col + 2] === player &&
                    gameState.board[row][col + 3] === player
                ) {
                    return true;
                }
            }
        }

        //Check for vertical win
        for (let row = 0; row <= 2; row++) {
            for (let col = 0; col < 7; col++) {
                if (
                    gameState.board[row][col] === player &&
                    gameState.board[row + 1][col] === player &&
                    gameState.board[row + 2][col] === player &&
                    gameState.board[row + 3][col] === player
                ) {
                    return true;
                }
            }
        }

        //Check for diagonal win (top left to bottom rigjt)
        for (let row = 0; row <= 2; row++) {
            for (let col = 0; col <= 3; col++) {
                if (
                    gameState.board[row][col] === player &&
                    gameState.board[row + 1][col + 1] === player &&
                    gameState.board[row + 2][col + 2] === player &&
                    gameState.board[row + 3][col + 3] === player
                ) {
                    return true;
                }
            }
        }

        //Check for diagonal win (bottom left to top right)
        for (let row = 3; row < 6; row++) {
            for (let col = 0; col <= 3; col++) {
                if (
                    gameState.board[row][col] === player &&
                    gameState.board[row - 1][col + 1] === player &&
                    gameState.board[row - 2][col + 2] === player &&
                    gameState.board[row - 3][col + 3] === player
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    function dropToken(btnValue) {

        if (gameIsOver) {
            console.log("The game is already over!");
            return;
        }


        const column = parseInt(btnValue, 10);

        for (let row = 5; row >= 0; row--) {
            if (gameState.board[row][column] === 0) {
                gameState.board[row][column] = gameState.currentPlayer;
                gameState.currentPlayer = (gameState.currentPlayer === 1) ? 2 : 1;
                saveGameState();
                renderBoard();


                if (checkForWin(gameState.currentPlayer)) {
                    console.log(`Player ${gameState.currentPlayer} wins`);
                    gameIsOver = true;
                } else {
                    // ... (existing code for tie or game still going)
                    console.log("game is still going");
                }
                // Check for a tie (board is full)
                if (!gameState.board.flat().includes(0)) {
                    console.log("It's a tie!");
                    gameIsOver = true;
                }
                break;
            } else if (row === 0 && gameState.board[row][column] !== 0) {
                console.log('Column is full');
            }
        }
    }



    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            dropToken(button.dataset.value);
        });


    });

    newGameBtn.addEventListener('click', newGame); // Add event listener for the new game button


    renderBoard();


});