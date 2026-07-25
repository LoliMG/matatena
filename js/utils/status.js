const Status = {
    players: [],
    currentPlayerIndex: null,
    currentDice: null,
    isGameOver: false,

    // Initializes the game session with dynamic player names from DOM
    startGame() {
        const p1Title = document.getElementById("p1-title");
        const p2Title = document.getElementById("p2-title");

        const name1 = p1Title ? p1Title.textContent.trim() : "Jugador 1";
        const name2 = p2Title ? p2Title.textContent.trim() : "Jugador 2";

        this.players = [new Player(name1), new Player(name2)];
        this.currentPlayerIndex = Math.floor(Math.random() * 2);
        this.currentDice = null;
        this.isGameOver = false;
    },

    // Rolls the dice for the current turn
    throwDice() {
        if (this.isGameOver) {
            return null;
        }

        // Prevent rolling multiple times in the same turn
        if (this.currentDice !== null && this.currentDice.value !== null) {
            return null;
        }

        this.currentDice = new Dice();
        const value = this.currentDice.throw();
        return value;
    },

    // Places the rolled dice into a specific column (0, 1, or 2) for a player (0 or 1)
    placeDice(playerIndex, columnIndex) {
        // Validations
        if (this.isGameOver) {
            return false;
        }
        if (this.currentPlayerIndex !== playerIndex) {
            return false; // Only the active turn player can place dice
        }
        if (this.currentDice === null || this.currentDice.value === null) {
            return false; // Must roll dice before placing
        }

        const currentPlayer = this.players[this.currentPlayerIndex];
        const targetColumn = currentPlayer.columns[columnIndex];

        if (Rules.isColumnFull(targetColumn)) {
            return false; // Column is already full
        }

        // 1. Add dice to current player's column
        targetColumn.push(this.currentDice.value);

        // 2. Destroy matching dice in opponent's column
        const oponentIndex = 1 - this.currentPlayerIndex;
        const oponentColumn = this.players[oponentIndex].columns[columnIndex];
        this.players[oponentIndex].columns[columnIndex] = Rules.removeMatchingDice(oponentColumn, this.currentDice.value);

        // 3. Check if current board is full to end the game
        if (Rules.isBoardFull(currentPlayer.columns)) {
            this.isGameOver = true;
        } else {
            this.currentDice = null;
            this.nextPlayer();
        }

        return true;
    },

    // Switches turn to the next player
    nextPlayer() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    },

    // Returns the current player object
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    },

    // Determines the winner when the game ends
    getWinner() {
        if (this.isGameOver === false) {
            return null;
        }

        const scoreP1 = Rules.calculatePlayerScore(this.players[0].columns);
        const scoreP2 = Rules.calculatePlayerScore(this.players[1].columns);

        if (scoreP1 > scoreP2) {
            return { winner: this.players[0], scoreP1: scoreP1, scoreP2: scoreP2, result: "p1" };
        }
        if (scoreP2 > scoreP1) {
            return { winner: this.players[1], scoreP1: scoreP1, scoreP2: scoreP2, result: "p2" };
        }
        return { winner: null, scoreP1: scoreP1, scoreP2: scoreP2, result: "tie" };
    }
}