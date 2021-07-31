const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let clickCount = 0; 
let firstCard = ""; 
let score = 0;

// Add best game data
let bestGame = document.createElement('span');
bestGame.style.marginLeft = '50px';
let lowScore = localStorage.getItem("lowScore");

// Add a Start button
const startBtn = document.createElement('button');
startBtn.innerText = "Start New Game!";
startBtn.style.marginLeft = '50px';
const h1 = document.querySelector('h1');
h1.append(startBtn);

// Add score display
const scoreDisplay = document.createElement('span');
scoreDisplay.style.marginLeft = '100px';
h1.appendChild(scoreDisplay);
h1.appendChild(bestGame);

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

startBtn.addEventListener("click", function() { //displays game when clicked
  while (gameContainer.hasChildNodes()) {  // first remove any existing cards
    gameContainer.removeChild(gameContainer.firstChild);
  }
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  score = 0;
  scoreDisplay.innerText = `Score: ${score}`;
  if (localStorage.getItem("lowScore") === null) {bestGame.innerText = "";}
  else {bestGame.innerText = `Best game: ${localStorage.getItem("lowScore")}`};

});


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    startBtn.remove();
  }

}

function handleCardClick(event) {
  if (event.target.style.backgroundColor === "" && clickCount === 0) {  //First eligible card
      clickCount++;
      firstCard = event.target; // Save first card
      firstCard.style.backgroundColor = event.target.className; //Show card color   
  }

  if (event.target.style.backgroundColor === "" && clickCount === 1) {  //Second eligible card
    clickCount++;
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    event.target.style.backgroundColor = event.target.className; //Show card color

    if (event.target.style.backgroundColor !== firstCard.style.backgroundColor) { // No match
      setTimeout(function() {  // reset cards and counter
        event.target.style.backgroundColor = ""; 
        firstCard.style.backgroundColor = ""; 
        clickCount = 0; 
      }, 1000);
    } 
    
    else {   // Match
        clickCount = 0; // reset counter
        const divs = document.querySelectorAll('div');
        let cardsRemaining = 10;
        for (div of divs) {
            if (div.style.backgroundColor !== "") { // used card
              cardsRemaining--;
              if (cardsRemaining === 0) {  // when no more cards, end game
                h1.append(startBtn);    //add the start button back
                if (score < localStorage.getItem("lowScore") ||
                    localStorage.getItem("lowScore") === null) //compare score to localStorage
                  localStorage.setItem("lowScore", score);
              }
            }       
        }
    }
  }
}

