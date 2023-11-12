let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

let popCount = 0
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let gameLength = 5000

function startGame() {
    console.log("Game Starting...")

    startButton.setAttribute("disabled", "true")
    inflateButton.removeAttribute("disabled")

    setTimeout(stopGame, gameLength)
}

function inflate() {
    console.log("Inflated Balloon")
    clickCount++
    height += inflationRate
    width += inflationRate
    
    if (height >= maxSize) {
        console.log("Balloon Popped")
        popCount++
        height = 50
        width = 30
    }
    draw()
}

function draw() {
    let balloonElement = document.getElementById("balloon")
    let clickCountElement = document.getElementById("click-count")
    let popCountElement = document.getElementById("pop-count")

    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    clickCountElement.innerText = clickCount.toString()
    popCountElement.innerText = popCount.toString()
}

function stopGame() {
    console.log("It's been 3 seconds.")
    inflateButton.setAttribute("disabled", "true")
    startButton.removeAttribute("disabled")

    clickCount = 0
    height = 120
    width = 100

    draw()
}