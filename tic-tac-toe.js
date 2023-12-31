console.log('pirate tic tac toe');



const playerText = document.querySelector('.play-text')
const restartBtn = document.querySelector('.restart-btn')
const boxes = Array.from(document.getElementsByClassName('box'))
const playerXWins = document.getElementById("playerXWins");
const playerOWins = document.getElementById("playerOWins");
const draws = document.getElementById("draws");

let playerXScore = 0;
let playerOScore = 0;
let drawsScore = 0;


const O_Text = 'O'
const X_Text = 'X'
let currentPlayer = X_Text
let spaces = Array(9).fill(null)



const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', handleClick))
}
restartBtn.addEventListener('click', handleRestart)

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


let moves = 0

const X_Moves = []
const O_Moves = []

function handleClick(evt) {
  const id = evt.target.id
  if(!spaces[id]){
    spaces[id] = currentPlayer
    evt.target.innerText = currentPlayer
    moves++;

    if (playerWins()) {
      playerText.innerText = `Player ${currentPlayer} has won`
      if (currentPlayer === X_Text) {
        X_Moves.push(id)
      } else {
        O_Moves.push(id)
      }
      return
    } else if (moves === 500) {
      playerText.innerText = `It's a draw!`
      return
    } 

    if (currentPlayer === X_Text) {
      X_Moves.push(id)
      if (X_Moves.length >= 4) {
        const oldestMove = X_Moves.shift()
        spaces[oldestMove] = null
        document.getElementById(oldestMove).innerText = ''
        playerText.innerText = "O's move"
      }
    } else {
      O_Moves.push(id)
      if (O_Moves.length >= 4) {
        const oldestMove = O_Moves.shift()
        spaces[oldestMove] = null
        document.getElementById(oldestMove).innerText = ''
        playerText.innerText = "X's move"
      }
    }

    currentPlayer = currentPlayer == X_Text ? O_Text : X_Text
  }
}


function updateScoreboard() {
  playerXWins.innerText = playerXScore;
  playerOWins.innerText = playerOScore;
  draws.innerText = drawsScore;
}
  



function playerWins() {
  for (let winner of winningCombo) {
    let [a, b, c] = winner

    if(spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
      if (spaces[a] === X_Text) {
        playerXScore++; 
      } else if (spaces[a] === O_Text) {
        playerOScore++; 
      }
      updateScoreboard();
      return [a]
    }
      
    }
}

function checkDraw() {
  if (spaces.every(space => space !== null)) {
    drawsScore++; 
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

