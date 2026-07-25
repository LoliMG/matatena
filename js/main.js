// main.js - Main Game Controller connecting UI and Logic

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize game state
    Status.startGame();

    // Track the newly placed slot to animate pop-in ONLY for that die
    let lastPlacedSlot = null;

    // 2. DOM Elements
    const p1RollBtn = document.getElementById("p1-roll-btn");
    const p2RollBtn = document.getElementById("p2-roll-btn");
    const p1DiceBox = document.getElementById("p1-dice-box");
    const p2DiceBox = document.getElementById("p2-dice-box");
    const p1TotalScore = document.getElementById("p1-total-score");
    const p2TotalScore = document.getElementById("p2-total-score");
    const p1ColScores = document.getElementById("p1-column-scores");
    const p2ColScores = document.getElementById("p2-column-scores");
    const gameOverBanner = document.getElementById("game-over-banner");
    const winnerText = document.getElementById("winner-text");
    const restartBtn = document.getElementById("restart-btn");

    // 3. Render initial 3D Cubes into the side dice boxes
    init3DCubes();

    function init3DCubes() {
        if (p1DiceBox) p1DiceBox.innerHTML = Dice3D.createCubeHTML(0);
        if (p2DiceBox) p2DiceBox.innerHTML = Dice3D.createCubeHTML(1);
    }

    // 4. Roll Dice Event Listeners for Player 1 and Player 2
    if (p1RollBtn) {
        p1RollBtn.addEventListener("click", () => {
            if (Status.currentPlayerIndex === 0) {
                const rolledValue = Status.throwDice();
                if (rolledValue !== null) {
                    p1RollBtn.disabled = true;
                    p1RollBtn.classList.add("disabled");
                    // Trigger 3D tumbling roll animation
                    Dice3D.rollToValue(0, rolledValue, () => {
                        updateUI();
                    });
                }
            }
        });
    }

    if (p2RollBtn) {
        p2RollBtn.addEventListener("click", () => {
            if (Status.currentPlayerIndex === 1) {
                const rolledValue = Status.throwDice();
                if (rolledValue !== null) {
                    p2RollBtn.disabled = true;
                    p2RollBtn.classList.add("disabled");
                    // Trigger 3D tumbling roll animation
                    Dice3D.rollToValue(1, rolledValue, () => {
                        updateUI();
                    });
                }
            }
        });
    }

    // 5. Restart Button Event Listener
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            Status.startGame();
            init3DCubes();
            updateUI();
        });
    }

    // 6. Event listeners for grid slot buttons
    const diceButtons = document.querySelectorAll(".dice-area");
    diceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const playerIndex = parseInt(button.getAttribute("data-player"), 10);
            const columnIndex = parseInt(button.getAttribute("data-column"), 10);

            // Validations before placement
            if (Status.isGameOver) return;
            if (Status.currentPlayerIndex !== playerIndex) return;
            if (!Status.currentDice || Status.currentDice.value === null) return;
            if (Rules.isColumnFull(Status.players[playerIndex].columns[columnIndex])) return;

            const placedValue = Status.currentDice.value;
            const oponentIndex = 1 - playerIndex;
            const oponentColumn = Status.players[oponentIndex].columns[columnIndex];
            const targetRowIndex = Status.players[playerIndex].columns[columnIndex].length;

            // Save last placed slot position for targeted pop-in animation
            lastPlacedSlot = { playerIndex, columnIndex, rowIndex: targetRowIndex };

            // If opponent column has matching dice, animate shrinking before state update
            if (oponentColumn.includes(placedValue)) {
                for (let r = 0; r < oponentColumn.length; r++) {
                    if (oponentColumn[r] === placedValue) {
                        const opBtn = document.querySelector(
                            `.dice-area[data-player="${oponentIndex}"][data-column="${columnIndex}"][data-row="${r}"]`
                        );
                        if (opBtn) {
                            const diceFace = opBtn.querySelector(".board-dice-face");
                            if (diceFace) {
                                diceFace.classList.add("shrinking");
                            }
                        }
                    }
                }

                setTimeout(() => {
                    Status.placeDice(playerIndex, columnIndex);
                    updateUI();
                }, 200);
            } else {
                Status.placeDice(playerIndex, columnIndex);
                updateUI();
            }
        });
    });

    // 7. Function to update the entire UI based on current Status state
    function updateUI() {
        // A. Render Player 1 and Player 2 boards with visual dice & matching highlights
        renderPlayerBoard(0);
        renderPlayerBoard(1);

        // Reset last placed slot tracking after rendering
        lastPlacedSlot = null;

        // B. Update column scores and total scores
        updateScores();

        // C. Update turn controls & button states
        updateTurnControls();

        // D. Check if game is over
        if (Status.isGameOver) {
            handleGameOver();
        } else {
            resetGameOverUI();
        }
    }

    // Renders the 3x3 dice values for a given player (0 or 1)
    function renderPlayerBoard(playerIndex) {
        const player = Status.players[playerIndex];

        for (let colIndex = 0; colIndex < 3; colIndex++) {
            const columnValues = player.columns[colIndex];

            // Count occurrences of each value in this column for double/triple match styling
            const counts = {};
            for (let v of columnValues) {
                counts[v] = (counts[v] || 0) + 1;
            }

            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                const btn = document.querySelector(
                    `.dice-area[data-player="${playerIndex}"][data-column="${colIndex}"][data-row="${rowIndex}"]`
                );

                if (btn) {
                    const diceValue = columnValues[rowIndex];

                    if (diceValue !== undefined) {
                        const count = counts[diceValue] || 1;
                        let matchType = "single";
                        if (count === 2) matchType = "double";
                        if (count >= 3) matchType = "triple";

                        // Check if this is the newly placed die to animate ONLY this die
                        const isNew = (lastPlacedSlot &&
                                       lastPlacedSlot.playerIndex === playerIndex &&
                                       lastPlacedSlot.columnIndex === colIndex &&
                                       lastPlacedSlot.rowIndex === rowIndex);

                        Dice3D.renderBoardDice(btn, diceValue, matchType, isNew);
                    } else {
                        Dice3D.renderBoardDice(btn, null);
                    }
                }
            }
        }
    }

    // Updates column score displays and player total scores
    function updateScores() {
        // Player 1 column scores & total
        const p1ColumnScores = Rules.columnScoreSeparated(Status.players[0].columns);
        for (let i = 0; i < 3; i++) {
            const el = document.getElementById(`p1-col${i}`);
            if (el) el.textContent = p1ColumnScores[i];
        }
        if (p1TotalScore) {
            p1TotalScore.textContent = Rules.calculatePlayerScore(Status.players[0].columns);
        }

        // Player 2 column scores & total
        const p2ColumnScores = Rules.columnScoreSeparated(Status.players[1].columns);
        for (let i = 0; i < 3; i++) {
            const el = document.getElementById(`p2-col${i}`);
            if (el) el.textContent = p2ColumnScores[i];
        }
        if (p2TotalScore) {
            p2TotalScore.textContent = Rules.calculatePlayerScore(Status.players[1].columns);
        }
    }

    // Updates active turn controls and roll button states
    function updateTurnControls() {
        const isP1Turn = Status.currentPlayerIndex === 0;

        // Update P1 Roll Button
        if (p1RollBtn) {
            const canP1Roll = isP1Turn && (!Status.currentDice || Status.currentDice.value === null) && !Status.isGameOver;
            p1RollBtn.disabled = !canP1Roll;
            p1RollBtn.classList.toggle("disabled", !canP1Roll);
        }

        // Update P2 Roll Button
        if (p2RollBtn) {
            const canP2Roll = !isP1Turn && (!Status.currentDice || Status.currentDice.value === null) && !Status.isGameOver;
            p2RollBtn.disabled = !canP2Roll;
            p2RollBtn.classList.toggle("disabled", !canP2Roll);
        }

        // Highlight active board
        const p1Board = document.querySelector('.player-board[data-player="0"]');
        const p2Board = document.querySelector('.player-board[data-player="1"]');

        if (p1Board && p2Board) {
            p1Board.classList.toggle("active-turn", isP1Turn && !Status.isGameOver);
            p2Board.classList.toggle("active-turn", !isP1Turn && !Status.isGameOver);
        }
    }

    // Displays in-game victory banner and hides column scores
    function handleGameOver() {
        const winnerData = Status.getWinner();

        // 1. Hide column scores
        if (p1ColScores) p1ColScores.style.display = "none";
        if (p2ColScores) p2ColScores.style.display = "none";

        // 2. Set winner message
        if (winnerText) {
            if (winnerData.result === "tie") {
                winnerText.textContent = "¡HA HABIDO UN EMPATE!";
            } else {
                winnerText.textContent = `¡HA GANADO ${winnerData.winner.name.toUpperCase()}!`;
            }
        }

        // 3. Show game over banner
        if (gameOverBanner) {
            gameOverBanner.style.display = "flex";
        }
    }

    // Restores default UI when starting a new game
    function resetGameOverUI() {
        // Show column scores
        if (p1ColScores) p1ColScores.style.display = "flex";
        if (p2ColScores) p2ColScores.style.display = "flex";

        // Hide game over banner
        if (gameOverBanner) gameOverBanner.style.display = "none";
    }

    // Initial render
    updateUI();
});
