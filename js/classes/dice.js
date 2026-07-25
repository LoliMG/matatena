/**
 * Represents a 6-sided dice instance.
 */
class Dice {
    constructor() {
        this.value = null;
    }

    /**
     * Rolls the dice and generates a random integer between 1 and 6.
     * @returns {number} The rolled dice value.
     */
    throw() {
        this.value = Math.floor(Math.random() * Dice.SIDES) + 1;
        return this.value;
    }
}

Dice.SIDES = 6;
