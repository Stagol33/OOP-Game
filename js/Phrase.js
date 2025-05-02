/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        const phraseContainer = document.querySelector("#phrase ul");
        
        // Loop through each character in the phrase
        [...this.phrase].forEach(char => {
            const li = document.createElement('li');
            
            if (char === ' ') {
                li.className = 'space';
                li.textContent = ' ';
            } else {
                li.className = `hide letter ${char}`;
                li.textContent = char;
            }
            
            phraseContainer.appendChild(li);
        });
    }

    /**
     * Check if letter is in phrase
     * @param {string} letter - Letter to check
     * @return {boolean} True if letter appears in phrase, false otherwise
     */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    /**
     * Displays passed letter on screen after a match is found
     * @param {string} letter - Letter to display
     */
    showMatchedLetter(letter) {
        const matchedLetters = document.querySelectorAll(`.${letter}`);
        
        matchedLetters.forEach(element => {
            element.classList.remove('hide');
            element.classList.add('show');
        });
    }
}
