const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 500,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    countDown: 1000,
  },
  action: {
    timeID: null,
    countDownTimerID: null,
  },
}

function countDown() {
  state.action.countDownTimerID = setInterval(() => {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime
    if (state.values.currentTime <= 0) {
      clearInterval(state.action.countDownTimerID)
      clearInterval(state.action.timeID)
      alert("Tempo esgotado! O seu resultado foi: " + state.values.result)
    }
  }, 1000)
}

function moveEnemy() {
  state.values.timeID = setInterval(randomSquare, state.values.gameVelocity)
}
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
  })
  let randomNumber = Math.floor(Math.random() * 9)
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemy")
  state.values.hitPosition = randomSquare.id
}
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++
        state.view.score.textContent = state.values.result
        state.values.hitPosition = null
        PlayerSound()
      }
    })
  })
}

function PlayerSound() {
  let audio = new Audio("./audio/som.m4a")
  audio.volume = 0.2
  audio.play()
}

function init() {
  moveEnemy()
  addListenerHitBox()
  randomSquare()
  countDown()
}
