const square = document.getElementById("square")
const mainContent = document.getElementById("main-content")
const button = document.getElementById("start")
const timer = document.createElement("p")
const punti_tag = document.createElement("p")
const game_timer = document.getElementById("time-bar")

const gameInfo = {
    container: document.getElementById("info-game"),
    punti: document.getElementById("punteggio"),
    max_punti: document.createElement("span"),
    max_punti_tag: document.createElement("p"),
}

timer.classList.add("untangible-text")
punti_tag.classList.add("untangible-text")
punti_tag.setAttribute("id", "punti")
timer.setAttribute("id", "start-timer")

gameInfo.max_punti_tag.textContent = "il tuo punteggio massimo è "
gameInfo.max_punti_tag.appendChild(gameInfo.max_punti)

gameInfo.max_punti_tag.style.display = "none"

mainContent.appendChild(timer)
mainContent.appendChild(punti_tag)
gameInfo.container.appendChild(gameInfo.max_punti_tag)

const possible_color = ["green", "red", "yellow", "blue", "cyan", "violet", "orange"]

var cont
var temp
var game
var sec
var punti

var punteggio_massimo = -1

var w = mainContent.offsetWidth
var h = mainContent.offsetHeight - mainContent.offsetTop

function startGame() {
    sec = 30
    cont = 3
    punti = 0
    
    button.style.display = "none"
    
    timer.textContent = ""
    timer.style.display = "block"

    temp = setInterval(countDown, 1000)
    countDown()
}

function countDown() {
    if (cont == -1) {
        clearInterval(temp)
        newSquare()

        punti_tag.textContent = 0

        game = setInterval(time, 1000)

        timer.style.display = "none"
        time()
    } else if (cont == 0) {
        timer.textContent = "GO!"
    } else {
        timer.textContent = cont
    }
    cont--
}

function time() {
    if (sec == 30) {
        game_timer.style.display = "block"
    }

    if(sec == 0) {
        clearInterval(game)

        gameEnd()
        return
    }

    // timer.textContent = sec + "s"
    sec--
}

function newSquare(){
    let top = Math.floor(Math.random() * h);
    let left = Math.floor(Math.random() * w);

    if (top > (mainContent.clientHeight))
        top -= 50

    if (left > (mainContent.clientHeight))
        left -= 50

    square.style.top = top + "px" 
    square.style.left = left + "px"
    
    square.style.display = "block"

    let color = possible_color[Math.floor(Math.random() * possible_color.length)]

    square.style.backgroundColor = color
    square.style.boxShadow = "0px 0px 30px " + color

    punti_tag.textContent = punti++
}

function gameEnd() {
    button.style.display = "block"
    square.style.display = "none"
    timer.textContent = ""
    punti_tag.textContent = ""
    game_timer.style.display = "none"

    gameInfo.punti.textContent = punti
    
    if (punteggio_massimo != -1) {
        gameInfo.max_punti_tag.style.display = "block"
    }

    punteggio_massimo = Math.max(punti, punteggio_massimo)
    gameInfo.max_punti.textContent = punteggio_massimo

    gameInfo.container.style.display = "flex"
}

document.addEventListener("click", e => {
    gameInfo.container.style.display = "none"
})
square.addEventListener("click", newSquare)
button.addEventListener("click", startGame)