/**
 * Represents a game player with a name and a 3-column board array.
 */
class Player {
    constructor(name = "Jugador") {
        this.name = name;
        this.columns = [
            [], // Column 0 (up to 3 dice)
            [], // Column 1 (up to 3 dice)
            []  // Column 2 (up to 3 dice)
        ];
    }
}