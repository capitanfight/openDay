import { Card, Combination } from "./cards.js"

const n_cards = {
    row: 4,
    column: 4,
}
const cards = [new Combination("cpp"), new Combination("cS"), new Combination("js"), new Combination("java"), new Combination("php"), 
    new Combination("ruby"), new Combination("mySql"), new Combination("python")]
// const cards = [new Combination("a"), new Combination("b")]


const start_btn = document.getElementById("start")
const container = document.getElementById("container")
const punteggio = document.querySelector("#punteggio>span")
const punteggio_tag = document.getElementById("punteggio")

container.style.gridTemplateColumns = "1fr ".repeat(n_cards.column)
container.style.gridTemplateRows = "1fr ".repeat(n_cards.row)

punteggio_tag.style.display = "none"

let possible_cards = null
let current_cards = []
let uncoveredCard = null
let punti

let canPerformAction = true

function start() {
    if (possible_cards != null) return

    possible_cards = cards.map(e => e)
    punti = 0

    punteggio_tag.style.display = "block"
    punteggio.textContent = 0
    createCards()
}

function createCards() {
    for (let i = 0; i < n_cards.row * n_cards.column; i++) {
        let idx = Math.floor(Math.random() * possible_cards.length)
        let card = possible_cards[idx]

        if (++card.n == 2)
            possible_cards.splice(idx, 1)


        current_cards[i] = new Card(i, card.content)
        current_cards[i].place(container)
        current_cards[i].setGridPos(n_cards)

        current_cards[i].tag.addEventListener("click", uncover)
    }
}

function uncover(e) {
    if (!canPerformAction) return
    e = e.target

    if (uncoveredCard == null) {
        let idx = e.getAttribute("pos")

        current_cards[idx].uncover()
        uncoveredCard = current_cards[idx]
    } else {
        if (uncoveredCard.tag == e) return
        canPerformAction = false

        let idx = e.getAttribute("pos")
        if (uncoveredCard.content == current_cards[parseInt(idx)].content) {
            current_cards[idx].uncover()
            setTimeout(endOfAction, 1000, [uncoveredCard, current_cards[idx]], true)

            current_cards[uncoveredCard.pos] = null
            current_cards[idx] = null

            if (!current_cards.some((e) => {
                if (e == null)
                    return false
                return true
            })) {
                end()
            }
        } else {
            current_cards[idx].uncover()
            setTimeout(endOfAction, 1000, [uncoveredCard, current_cards[idx]], false)
        }

        uncoveredCard = null
    }
}

function endOfAction(cards, remove) {
    if (remove) {
        cards[0].remove()
        cards[1].remove()
        punteggio.textContent = --punti
    } else {
        cards[0].cover()
        cards[1].cover()
        punteggio.textContent = ++punti
    }

    canPerformAction = true
}

function end() {
    possible_cards = null
    current_cards = []
}

start_btn.addEventListener("click", start)