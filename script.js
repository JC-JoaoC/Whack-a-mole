const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector ("#time"),
        score: document.querySelector ("#score")
    },
    values: {
        timeID: setInterval(randomSquare, 1000),
        countDownTimerID: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        tempo: 60,
    },
};

function countDown() {
    state.values.tempo--;
    state.view.timeLeft.textContent = state.values.tempo;
    if (state.values.countDownTimerID <= 0) {
        window.alert("Game Over! O seu resultado foi:" + state.values.result);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
});
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

// function moveEnemy() {
//     state.values.timeID = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        });
    });
}

function init() {
    // moveEnemy();
    addListenerHitBox();
};

init();