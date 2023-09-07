console.log('pirate tic tac toe');


// setting global variables
const playerText = document.querySelector('.play-text')
const restartBtn = document.querySelector('.restart-btn')
const boxes = Array.from(document.getElementsByClassName('box'))
const playerXWins = document.getElementById("playerXWins");
const playerOWins = document.getElementById("playerOWins");
const draws = document.getElementById("draws");

let playerXScore = 0;
let playerOScore = 0;
let drawsScore = 0;

// win count and increment

// setting player variables
const O_Text = 'O'
const X_Text = 'X'
let currentPlayer = X_Text
let spaces = Array(9).fill(null)


// setting event listeners
const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', handleClick))
}
restartBtn.addEventListener('click', handleRestart)


// utility functions
let moves = 0

function handleClick(evt) {
  const id = evt.target.id
  if(!spaces[id]){
    spaces[id] = currentPlayer
    evt.target.innerText = currentPlayer
    moves++;

    if (playerWins()) {
      playerText.innerText = `Player ${currentPlayer} has won`
      
      return
    } else if (moves === 9) {
      playerText.innerText = `It's a draw!`
      checkDraw()
    } 

    currentPlayer = currentPlayer == X_Text ? O_Text : X_Text
  }
}


function updateScoreboard() {
  playerXWins.innerText = playerXScore;
  playerOWins.innerText = playerOScore;
  draws.innerText = drawsScore;
}
  

const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


function playerWins() {
  for (let winner of winningCombo) {
    let [a, b, c] = winner

    if(spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
      if (spaces[a] === X_Text) {
        playerXScore++; // Increment X's score
      } else if (spaces[a] === O_Text) {
        playerOScore++; // Increment O's score
      }
      updateScoreboard();
      return [a]
    
    // } else {
    //   if (spaces = Array(9).fill(null))
    //   return false
    }
      
    }
}
function checkDraw() {
  if (spaces.every(space => space !== null)) {
    drawsScore++; // Increment the draws score
    updateScoreboard();
  }
}

function handleRestart() {
spaces.fill(null)
moves = 0

  boxes.forEach(box => {
    box.innerText = ''
  })

  playerText.innerText = 'Pirate Tic Tac Toe'
  currentPlayer = X_Text


}
startGame()

