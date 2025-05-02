/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
/* 
 * Main application file for the Phrase Hunter game
 */

let game;

// Add event listener for the "Start Game" button
document.getElementById('btn__reset').addEventListener('click', () => {
    game = new Game();
    game.startGame();
});

// Add event listeners for onscreen keyboard buttons using event delegation
document.getElementById('qwerty').addEventListener('click', (e) => {
    if (e.target.className === 'key') {
        game.handleInteraction(e.target);
    }
});

// Add keyboard functionality for physical keyboard input
document.addEventListener('keyup', (e) => {
    // Only process keyboard input if game is active and key is a letter
    if (game && game.activePhrase && /^[a-z]$/.test(e.key)) {
        // Find the corresponding onscreen button
        const buttons = document.querySelectorAll('.key');
        const matchingButton = Array.from(buttons).find(button => 
            button.textContent === e.key && !button.disabled
        );
        
        // If we found a matching button that's not already used, handle the interaction
        if (matchingButton) {
            game.handleInteraction(matchingButton);
        }
    }
});
