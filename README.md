# Matatena (Knucklebones)

A fast-paced, strategic 2-player dice game built with vanilla HTML, CSS, and JavaScript. Inspired by the Knucklebones mini-game from *Cult of the Lamb*, featuring dark fantasy aesthetics, pure CSS 3D dice tumbling animations, and column multiplier mechanics.

---

## 🚀 How to Start the Game

Getting started is simple. **You do not need to install Node.js, npm, or any build tools.**

1. Clone or download this repository to your computer.
2. Open the file [`pages/index/index.html`](pages/index/index.html) directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).
3. Click the **JUGAR** button on the home screen to start playing!

> 💡 **Tip:** You can also run it using a lightweight local web server like VS Code's *Live Server* extension or `npx serve` if you prefer local hosting.

---

## 🎮 Game Concept in a Nutshell

Each player controls a 3x3 grid board (Player 1 on top, Player 2 on the bottom).

- On your turn, roll your 3D die on your side panel.
- Choose one of your 3 board columns to place the rolled die.
- **Destroy opponent dice:** Placing a number wipes out all matching dice in your opponent's column directly across from yours!
- **Score multipliers:** Getting matching numbers in the same column boosts your score exponentially ($2\times$ for pairs, $3\times$ for triplets).
- The game ends as soon as any player fills all 9 slots on their board. The player with the highest total score wins!

---

## 📚 Project Documentation

Explore the detailed guides located in the [`docs/`](docs/) folder:

- 📜 **[RULES.md](docs/RULES.md)** — Complete game rules, scoring formulas, column multipliers, and game-over conditions.
- 🏗️ **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** — Codebase structure, 3D CSS dice engine, state management, and component layout.
- 🛠️ **[DEVELOPMENT.md](docs/DEVELOPMENT.md)** — Developer guide for running locally, customizing themes, or tweaking game parameters.

---

## 🎨 Technology Stack

- **HTML5:** Semantic markup with responsive layouts.
- **Vanilla CSS:** Custom design tokens, CSS Nesting, grid layouts, and 3D transform animations without external frameworks.
- **Vanilla JavaScript (ES6+):** Object-oriented classes, state management, and DOM event controllers.

---

## 📄 License

Open-source project built for educational and recreational purposes. Inspired by *Cult of the Lamb* by Massive Monster & Devolver Digital.
