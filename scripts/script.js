 //Selecting elements from the page (Variables)
  const wordDisplay = document.querySelector(".word-display");
  const guessesText = document.querySelector(".guesses-text b");
  const keyboardDiv = document.querySelector(".keyboard");
  const hangmanImage = document.querySelector(".hangman-box img");
  const gameModel = document.querySelector(".game-model");
  const playAgainBtn = gameModel.querySelector("button");
  
 //Initializing game variables
 let currentWord, correctLetters, wrongGuessCount;
 const maxGuesses = 6;

 //Function to reset game
 const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src= "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    //create the empty letter slots
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("");
    //enable keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    //Hide the game model 
    gameModel.classList.remove("show");
}

//function to get a random word and set up the game
const getRandomWord = () => {
    //Picking a random word and hint from wordList array 
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    //Set the current word and update the hint
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    // call reset game
    resetGame();
}

//Function to handle the end of game win or lose
const gameOver = (isVictory) => {
    //show the game over model with win or lose 
    const modelText = isVictory ? `You found the word:` : `The correct word was:`;
    gameModel.querySelector("img").src= `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModel.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
    gameModel.classList.add("show");
}

//Creating a for loop to display our keyboard buttons
for(let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    //Adding a click event listener for each button
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

//Function to handle the game logic when a letter is clicked
const initGame = (button, clickedLetter) => {
    //checking if the click letter is in the currentWord
    if (currentWord.includes(clickedLetter)) {
        //update the displayed letters if clicked is correct
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li") [index].innerText = letter;
                wordDisplay.querySelectorAll("li") [index].classList.add("guessed");
            }
        });
    } else  { 
        //update wrong guess count and hangman image if letter is incorrect
        wrongGuessCount++;
        hangmanImage.src= `images/hangman-${wrongGuessCount}.svg`;
    } 
    //disabled the clicked  button so it can't be clicked again
    button.disabled = true;
    //update the displayed guess count 
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    //Checked if the game should end based on win or lose conditions
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}



// Starting the game with a random word
getRandomWord();

 //Add event listener for the  play again button
 playAgainBtn.addEventListener("click", getRandomWord);