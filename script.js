document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restartBtn");
    const title = document.querySelector(".title");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Function to check for a winner
    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    };

    // Function to check for a tie
    const checkTie = () => {
        return !gameBoard.includes("") && !checkWinner();
    };

    // Function to announce the winner
    const announceWinner = (winner) => {
        title.textContent = winner ? `${winner} wins!` : "It's a tie!";
    };

    // Function to handle cell click
    const handleCellClick = (index) => {
        if (!gameBoard[index] && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";

            const winner = checkWinner();
            if (winner || checkTie()) {
                announceWinner(winner);
            }
        }
    };

    // Function to restart the game
    const restartGame = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        title.textContent = "TIC TAC TOE";
    };

    // Event listeners
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    restartBtn.addEventListener("click", restartGame);
});
