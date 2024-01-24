// Buttons
let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

// #region Game Functions and Data

// Data
let currentPopCount = 0
let highestPopCount = 0
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 200
let gameLength = 5000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}

// Functions
function startGame() {
    console.log("Game Starting...")

    startButton.setAttribute("disabled", "true")
    inflateButton.removeAttribute("disabled")

    startClock()
    setTimeout(stopGame, gameLength)
}

function startClock() {
    timeRemaining = gameLength
    drawClock()
    clockId = setInterval(drawClock, 1000)
}

function stopClock() {
    clearInterval(clockId)
}

function drawClock() {
    let countdownElem = document.getElementById("countdown")
    countdownElem.innerText = (timeRemaining / 1000).toString()
    timeRemaining -= 1000
}

function inflate() {
    console.log("Inflated Balloon")
    clickCount++
    height += inflationRate
    width += inflationRate
    
    if (height >= maxSize) {
        console.log("Balloon Popped")
        currentPopCount++
        height = 50
        width = 30
    }
    draw()
}

function draw() {
    let balloonElement = document.getElementById("balloon")
    let clickCountElement = document.getElementById("click-count")
    let popCountElement = document.getElementById("pop-count")
    let highPopCountElement = document.getElementById("high-count")
    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    clickCountElement.innerText = clickCount.toString()
    popCountElement.innerText = currentPopCount.toString()
    highPopCountElement.innerText = currentPlayer.topScore.toString()
}

function stopGame() {
    console.log("It's been 3 seconds.")
    inflateButton.setAttribute("disabled", "true")
    startButton.removeAttribute("disabled")

    clickCount = 0
    height = 120
    width = 100

    if (currentPopCount > currentPlayer.topScore) {
        currentPlayer.topScore = currentPopCount
        savePlayers()
    }
    currentPopCount = 0

    stopClock()
    draw()
}

// #endregion

let players = []
loadPlayers()

function setPlayer(event) {
    event.preventDefault()
    let form = event.target
    
    console.log(form.playerName.value + " is now the current Player's Name")
    let playerName = form.playerName.value

    currentPlayer = players.find(player => player.name == playerName)

    if (!currentPlayer) {
        currentPlayer = { name: playerName, topScore: 0 }
        players.push(currentPlayer)
        savePlayers()
    }

    console.log(currentPlayer)
    form.reset()
    document.getElementById("game").classList.remove("hidden")
    form.classList.add("hidden")
    draw()
}

function changePlayer() {
    document.getElementById("player-form").classList.remove("hidden")
    document.getElementById("game").classList.add("hidden")
}

function savePlayers() {
    window.localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers() {
    let playersData = JSON.parse(window.localStorage.getItem("players"))
    if (playersData) {
        players = playersData
    }
}