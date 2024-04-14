document.addEventListener("DOMContentLoaded", function() {
    const words = [
        { word: "hello", hint: "Greeting" },
        // { word: "banana", hint: "Yellow fruit" },
        // { word: "computer", hint: "Electronic device" }
    ];
    let currentWordIndex = 0;
    let currentWord = words[currentWordIndex].word;
    let currentHint = words[currentWordIndex].hint;
    const maxAttempts = 6;
    let currentAttempt = 0;
    let guessedLetters = [];

    const wordDisplay = document.getElementById("word-display");
    const inputLetter = document.getElementById("input-letter");
    const submitButton = document.getElementById("submit-letter");
    const nextButton = document.getElementById("next-button");
    const message = document.getElementById("message");
    const hint = document.getElementById("hint");

    // Display underscores for each letter in the current word
    wordDisplay.textContent = currentWord.split("").map(() => "_").join(" ");
    hint.textContent = "Hint: " + currentHint;

    // Event listener for submit button
    submitButton.addEventListener("click", function() {
        const letter = inputLetter.value.toLowerCase();
    
        if (!validateInput(letter)) {
            message.textContent = "Please enter a valid letter.";
            return;
        }
    
        if (guessedLetters.includes(letter)) {
            message.textContent = "You've already guessed that letter.";
            return;
        }
    
        guessedLetters.push(letter);
    
        if (currentWord.includes(letter)) {
            revealLetter(letter);
            if (isWordGuessed()) {
                endWord();
            }
        } else {
            currentAttempt++;
            if (currentAttempt >= maxAttempts) {
                message.textContent = "You've used all your attempts. The word was: " + currentWord;
                endWord();
            } else {
                message.textContent = "Incorrect guess. " + (maxAttempts - currentAttempt) + " attempts remaining.";
            }
        }
    
        inputLetter.value = "";
    });
    

        // Function to end the current word and show next button
    function endWord() {
        message.textContent = "Congratulations! You've guessed the word.";
        nextButton.style.display = "block"; // Show Next button
        inputLetter.disabled = true;
        submitButton.disabled = true;
    }

    // Event listener for next button
    nextButton.addEventListener("click", function() {
        nextWord();
    });

    // Function to validate input (must be a single letter)
    function validateInput(letter) {
        return /^[a-zA-Z]$/.test(letter);
    }

    // Function to reveal a letter in the word display
    function revealLetter(letter) {
        const wordArray = currentWord.split("");
        for (let i = 0; i < currentWord.length; i++) {
            if (wordArray[i] === letter) {
                wordDisplay.textContent = wordDisplay.textContent.substring(0, 2 * i) + letter + wordDisplay.textContent.substring(2 * i + 1);
            }
        }
    }

    // Function to check if the word has been completely guessed
    function isWordGuessed() {
        return wordDisplay.textContent === currentWord;
    }

    // Function to move to the next word
    function nextWord() {
        currentWordIndex++;
        if (currentWordIndex < words.length) {
            currentWord = words[currentWordIndex].word;
            currentHint = words[currentWordIndex].hint;
            wordDisplay.textContent = currentWord.split("").map(() => "_").join(" ");
            hint.textContent = "Hint: " + currentHint;
            message.textContent = "";
            guessedLetters = [];
            inputLetter.disabled = false;
            submitButton.disabled = false;
            nextButton.style.display = "none";
            currentAttempt = 0;
        } else {
            message.textContent = "You've completed all the words!";
            nextButton.style.display = "none";
            inputLetter.disabled = true;
            submitButton.disabled = true;
        }
    }
});
