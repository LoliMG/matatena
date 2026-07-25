const Rules = {
    MAX_DICE: 3,

    // Calculates the score of a single column according to game rules
    calculateColumnScore(columnValues) {
        const amount = {};

        // Count occurrences of each dice value
        for (let i = 0; i < columnValues.length; i++) {
            const value = columnValues[i];

            if (amount[value] === undefined) {
                amount[value] = 1;
            } else {
                amount[value] = amount[value] + 1;
            }
        }

        let total = 0;

        // Score formula: value * (count)^2 (e.g. two 5s = 5 * 2 * 2 = 20)
        for (const value in amount) {
            const bonus = amount[value];
            total = total + (Number(value) * bonus * bonus);
        }

        return total;
    },

    // Returns an array with the individual scores for each of the 3 columns
    columnScoreSeparated(columns) {
        let total = [];
        for (let i = 0; i < columns.length; i++) {
            total.push(this.calculateColumnScore(columns[i]));
        }
        return total;
    },

    // Sums all column scores to calculate the player's total score
    calculatePlayerScore(columns) {
        let total = 0;
        const separatedScores = this.columnScoreSeparated(columns);

        for (let i = 0; i < separatedScores.length; i++) {
            total = total + separatedScores[i];
        }
        return total;
    },

    // Checks if a single column is full (reached MAX_DICE)
    isColumnFull(columnValues) {
        return columnValues.length === this.MAX_DICE;
    },

    // Checks if the entire 3x3 board is completely filled
    isBoardFull(columns) {
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].length < this.MAX_DICE) {
                return false;
            }
        }
        return true;
    },

    // Removes ALL dice from the opponent's column that match the placed dice value
    removeMatchingDice(oponentColumn, placedValue) {
        const newColumn = [];
        for (let i = 0; i < oponentColumn.length; i++) {
            if (oponentColumn[i] !== placedValue) {
                newColumn.push(oponentColumn[i]);
            }
        }
        return newColumn;
    }
}
