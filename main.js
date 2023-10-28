let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let popCount = 0

function inflate() {
    clickCount++
    var balloonElement = document.getElementById("balloon")
    height += inflationRate
    width += inflationRate
    if (height >= maxSize) {
        console.log("Balloon Popped")
        height = 50
        width = 30
    }
    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    var clickCountElement = document.getElementById("click-count")
    clickCountElement.innerText = clickCount.toString()
}