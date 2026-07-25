# Game Rules & Scoring System

This document outlines the detailed game rules, scoring calculations, column multipliers, and win conditions for Matatena.

---

## 🎯 Objective

Fill your 3x3 board while maximizing your total score and destroying your opponent's dice. The game ends as soon as any player fills all 9 slots on their board.

---

## 🔄 Turn Structure

1. **Roll the Dice:** The active player clicks **"TIRAR DADO"** on their side panel. A 3D dice tumbles and lands on a random number between 1 and 6.
2. **Place the Dice:** The active player selects a column (left, middle, or right) on their board. The die drops into the lowest available slot in that column.
3. **Opponent Dice Destruction:** If the opponent has any dice in their corresponding column with the exact same value as the die just placed, **all** matching dice in that opponent column are immediately destroyed and removed from the board.
4. **Switch Turn:** Turn passes to the other player.

---

## 🧮 Scoring System & Multipliers

The total score for each player is calculated column by column and then summed together.

### Base Formula
When dice values repeat within the **same column**, their score is multiplied by the number of matching dice:

$$\text{Column Score} = \sum \left( \text{Dice Value} \times \text{Count}^2 \right)$$

### Scoring Breakdown Table

| Dice Combination in Same Column | Calculation Example | Points Awarded | Visual Highlight |
| :--- | :--- | :--- | :--- |
| Single `5` | $5 \times 1^2$ | **5 pts** | Ivory / Beige |
| Two `5`s | $5 \times 2^2$ ($5 \times 4$) | **20 pts** | Blue Glow |
| Three `5`s | $5 \times 3^2$ ($5 \times 9$) | **45 pts** | Gold / Yellow Glow |

### Example Column Score Calculation
If a column contains `[6, 6, 2]`:
- Two 6s: $6 \times 2^2 = 24$ points
- One 2: $2 \times 1^2 = 2$ points
- **Total Column Score:** $24 + 2 = \mathbf{26\text{ points}}$

---

## 💥 Opponent Dice Destruction Rule

Placing a die is not just about building your score—it is also your primary offensive move.

- When Player 1 places a **4** in Column 0, any **4**s currently residing in Player 2's Column 0 will instantly shrink and be deleted.
- Destruction only affects the **opposite column** matching the placed die. Dice in adjacent columns remain unaffected.

---

## 🏁 Game Over & Victory

- The game triggers the end sequence when a player places their 9th die (filling their board completely).
- Column score numbers disappear, and the final winner is declared directly on screen:

```text
¡HA GANADO JUGADOR 1!
```

- Players can click **"JUGAR DE NUEVO"** to reset the boards and immediately start a new match.

---

## 🔗 Related Documentation

- 🏠 [README.md](../README.md) — Main project overview and setup instructions.
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) — Technical code architecture and module design.
- 🛠️ [DEVELOPMENT.md](DEVELOPMENT.md) — Developer setup and customization guide.
