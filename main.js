
// #region Game Functions and Data

// Data
let currentPopCount = 0
let highestPopCount = 0
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let gameLength = 5000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}
let currentColor = "zero"
let possibleColors = ["zero", "two", "three", "three", "four"]

// Functions
function startGame() {
    console.log("Game Starting...")

    document.getElementById("game-controls").classList.remove("hidden");
    document.getElementById("main-controls").classList.add("hidden");
    document.getElementById("scoreboard").classList.add("hidden");

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
    checkBalloonPop()
    draw()
}

function checkBalloonPop() {
    if (height >= maxSize) {
        console.log("Balloon Popped")
        let balloonElement = document.getElementById("balloon")
        balloonElement.classList.remove(currentColor)
        getRandomColor()
        balloonElement.classList.add(currentColor)

        document.getElementById("pop-sound").play()
        
        currentPopCount++
        height = 50
        width = 30
    }
}

function getRandomColor() {
    let i = Math.floor(Math.random() * possibleColors.length)
    currentColor = possibleColors[i]
}

function draw() {
    let balloonElement = document.getElementById("balloon")
    let clickCountElement = document.getElementById("click-count")
    let popCountElement = document.getElementById("pop-count")
    let highPopCountElement = document.getElementById("high-count")
    let playerNameElement = document.getElementById("player-name")
    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    clickCountElement.innerText = clickCount.toString()
    popCountElement.innerText = currentPopCount.toString()
    highPopCountElement.innerText = currentPlayer.topScore.toString()

    playerNameElement.innerText = currentPlayer.name
}

function stopGame() {
    console.log("It's been " + gameLength / 1000 + " seconds. Ending game.");

    document.getElementById("game-controls").classList.add("hidden");
    document.getElementById("main-controls").classList.remove("hidden");
    document.getElementById("scoreboard").classList.remove("hidden");
    
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
    drawScoreboard()
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
    drawScoreboard()
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

function drawScoreboard() {
    let template = " "

    players.sort((p1, p2) => p2.topScore - p1.topScore)

    players.forEach(player => {
        template += `
        <div class="d-flex space-between">
            <span>
                <i class="fa fa-user" aria-hidden="true"></i>
                ${player.name}
            </span>
            <span>High Score: ${player.topScore}</span>
        </div>
        `
    })

    document.getElementById("players").innerHTML = template
}

drawScoreboard()