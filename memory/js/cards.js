export class Card {
    constructor(pos, content) {
        this.pos = pos
        this.content = content
        this.isCovered = true

        this.tag = document.createElement("div")
        this.tag.classList.add("card", "covered")
        this.tag.setAttribute("pos", pos)

        this.master = undefined
    }

    setGridPos(length) {
        this.tag.style.gridColumn = Math.floor(this.pos%length.column)+1
        this.tag.style.gridRow = Math.floor(this.pos/length.row)+1
    }

    place(master) {
        master.appendChild(this.tag)
        this.master = master
    }

    remove() {
        this.master.removeChild(this.tag)
    }

    uncover() {
        this.isCovered = false
        this.tag.classList.remove("covered")
        this.tag.classList.add(this.content)
    }

    cover() {
        this.isCovered = true
        this.tag.classList.add("covered")
        this.tag.classList.remove(this.content)
    }
}

export class Combination {
    constructor(content) {
        this.content = content
        this.n = 0
    }
}