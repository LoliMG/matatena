// 3Ddice.js - 3D Dice Renderer & Roll Animation Utility

const Dice3D = {
    // Rotation mapping for faces 1-6 to bring each face to the front
    rotations: {
        1: { x: 0, y: 0 },
        2: { x: 0, y: 180 },
        3: { x: 0, y: -90 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
    },

    // Keeps track of rotation turns so the dice tumbles continuously
    spinCount: {
        0: 0,
        1: 0
    },

    // Builds 3D cube HTML markup for the player's side dice box
    createCubeHTML(playerIndex) {
        return `
            <div class="cube-container">
                <div class="cube" id="cube-player-${playerIndex}">
                    <div class="cube-face face-1">${this.getFacePipsHTML(1)}</div>
                    <div class="cube-face face-2">${this.getFacePipsHTML(2)}</div>
                    <div class="cube-face face-3">${this.getFacePipsHTML(3)}</div>
                    <div class="cube-face face-4">${this.getFacePipsHTML(4)}</div>
                    <div class="cube-face face-5">${this.getFacePipsHTML(5)}</div>
                    <div class="cube-face face-6">${this.getFacePipsHTML(6)}</div>
                </div>
            </div>
        `;
    },

    // Returns pips (dots) layout HTML for dice values 1 to 6
    getFacePipsHTML(value) {
        let pips = '';
        for (let i = 1; i <= value; i++) {
            pips += `<span class="pip pip-${i}"></span>`;
        }
        return `<div class="pips-grid pips-${value}">${pips}</div>`;
    },

    // Animates the 3D cube tumbling to the target rolled dice value
    rollToValue(playerIndex, targetValue, onComplete) {
        const cubeEl = document.getElementById(`cube-player-${playerIndex}`);
        if (!cubeEl) return;

        const baseRot = this.rotations[targetValue];
        if (!baseRot) return;

        // Increase spin multiplier for continuous realistic tumbling animation
        this.spinCount[playerIndex] += 2;
        const extraDegrees = this.spinCount[playerIndex] * 360;

        const targetX = baseRot.x + extraDegrees;
        const targetY = baseRot.y + extraDegrees;

        cubeEl.style.transform = `rotateX(${targetX}deg) rotateY(${targetY}deg)`;

        if (onComplete) {
            setTimeout(onComplete, 1000);
        }
    },

    // Renders visual dice face inside a board slot (.dice-area) with Cult of the Lamb styling
    renderBoardDice(element, value, matchType = "single", isNew = false) {
        if (!value) {
            element.innerHTML = "";
            element.className = "dice-area";
            return;
        }

        element.className = `dice-area has-dice match-${matchType}`;
        const newClass = isNew ? " pop-in" : "";
        element.innerHTML = `
            <div class="board-dice-face val-${value}${newClass}">
                ${this.getFacePipsHTML(value)}
            </div>
        `;
    }
};