# Development & Customization Guide

This guide explains how to set up your environment for local development, customize themes and visuals, or tweak game parameters.

---

## 🛠️ Local Setup

No installation step is required.

1. **Direct File Open:** Simply open [`pages/index/index.html`](../pages/index/index.html) in your browser.
2. **VS Code Live Server (Optional):** Right-click [`pages/index/index.html`](../pages/index/index.html) and select **Open with Live Server** to enable automatic live reload on file saves.

---

## 🎨 Customizing Styles & Theme

### Global Design System (`general.css`)
Key design tokens are defined at the top of [`general.css`](../general.css):

```css
:root {
    --body-font: "Poppins", sans-serif;
    --skin-color: #dc2c2c;       /* Accent red color */
    --dark-black-color: #810303; /* Dark red highlight */
    --white-color: #ffffff;      /* White text color */
}
```

### Board Colors (`pages/game/game.css`)
- **Player 1 Board (Red Cult Theme):** Defined under `.player-board[data-player="0"]`.
- **Player 2 Board (Dark Charcoal Theme):** Defined under `.player-board[data-player="1"]`.

### Dice Faces & Highlights (`components/dice.css`)
Dice styling and match highlights can be customized in [`components/dice.css`](../components/dice.css):
- `.match-single`: Ivory/beige background (`#f5f0dc`)
- `.match-double`: Blue background (`#5c9bcf`)
- `.match-triple`: Gold background (`#e6be48`)

---

## ⚙️ Tweaking Game Parameters

### Changing Dice Sides
To change the dice from a 6-sided die to another value (e.g., 8-sided die), update `Dice.SIDES` in [`js/classes/dice.js`](../js/classes/dice.js):

```javascript
Dice.SIDES = 6;
```

### Modifying Column Limits
The maximum number of dice per column is controlled in [`js/utils/rules.js`](../js/utils/rules.js):

```javascript
MAX_DICE: 3
```

---

## 🧪 Testing State Logic

You can open your browser's Developer Tools Console (`F12` or `Ctrl+Shift+I`) to inspect or interact with the global `Status` state directly:

```javascript
// Check current player object
console.log(Status.getCurrentPlayer());

// Check current board state
console.log(Status.players[0].columns);

// Force start a new game session
Status.startGame();
```

---

## 🔗 Related Documentation

- 🏠 [README.md](../README.md) — Main project overview and setup instructions.
- 📜 [RULES.md](RULES.md) — Complete game rules and scoring formulas.
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) — Technical code architecture and module design.
