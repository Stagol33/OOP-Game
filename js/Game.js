/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Creates phrases for use in game
     * @return {array} An array of phrase objects
     */
    createPhrases() {
        return [
            new Phrase('Life is like a box of chocolates'),
            new Phrase('May the force be with you'),
            new Phrase('Just keep swimming'),
            new Phrase('There is no place like home'),
            new Phrase('The only way to do great work is to love what you do')
        ];
    }

    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {
        // Hide the start overlay
        document.getElementById('overlay').style.display = 'none';
        
        // Set the active phrase
        this.activePhrase = this.getRandomPhrase();
        
        // Display the phrase on the board
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Handles onscreen keyboard button clicks
     * @param {HTMLButtonElement} button - The clicked button element
     */
    handleInteraction(button) {
        const letter = button.textContent;
        
        // Disable the button
        button.disabled = true;
        
        if (!this.activePhrase.checkLetter(letter)) {
            // Wrong guess
            button.classList.add('wrong');
            this.removeLife();
        } else {
            // Correct guess
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);
            
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        }
    }

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if not
     */
    removeLife() {
        const hearts = document.querySelectorAll('.tries img');
        hearts[this.missed].src = 'images/lostHeart.png';
        
        this.missed++;
        
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        // Check if all letters have been revealed
        return document.querySelectorAll('.hide').length === 0;
    }

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const overlay = document.getElementById('overlay');
        const gameOverMessage = document.getElementById('game-over-message');
        
        overlay.style.display = 'flex';
        overlay.className = gameWon ? 'win' : 'lose';
        
        gameOverMessage.textContent = gameWon 
            ? 'Great job! You won!' 
            : 'Sorry, better luck next time!';
        
        // Reset the game board for the next game
        this.resetGame();
    }

    /**
     * Resets the game board between games
     */
    resetGame() {
        // Clear the phrase display
        const phraseUl = document.querySelector('#phrase ul');
        phraseUl.innerHTML = '';
        
        // Reset all keyboard buttons
        const keyboardButtons = document.querySelectorAll('.key');
        keyboardButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove('chosen', 'wrong');
        });
        
        // Reset all heart images
        const hearts = document.querySelectorAll('.tries img');
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png';
        });
    }
}
