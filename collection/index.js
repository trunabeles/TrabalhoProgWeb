const flashcards = JSON.parse(localStorage.getItem('lista'))?.listas
let cardInterval = 0
let cardPosition = 0
let idToDelete = -1

function main() {
    if (flashcards && flashcards.length > 0) {
        preencherCards()
        mostrarColecao()
    } else {
        esconderColecao()
    }
}
main()

function preencherCards() {
    const cardTitulos = document.querySelectorAll('.card__title')
    const cardSubTitulos = document.querySelectorAll('.card__subtitle')
    if (flashcards.length === 1) {
        const card = flashcards[0]
        cardTitulos[1].innerText = card.titulo
        cardSubTitulos[1].innerText = card.quantidadeQuestoes > 1 ? `${card.quantidadeQuestoes} questões` : '1 questão'
        cardTitulos[0].innerText = '-----'
        cardSubTitulos[0].innerText = '-----'
        cardTitulos[2].innerText = '-----'
        cardSubTitulos[2].innerText = '-----'
    } else if (screen.width > 670) {
        for(let indice = 0; indice < 3; indice++) {
            if (indice + cardInterval < flashcards.length) {
                let card = flashcards[cardInterval+indice]
                cardTitulos[indice].innerText = card.titulo
                cardSubTitulos[indice].innerText = card.quantidadeQuestoes > 1 ? `${card.quantidadeQuestoes} questões` : '1 questão'
            } else {
                cardTitulos[indice].innerText = '-----'
                cardSubTitulos[indice].innerText = '-----'
            }
        }
    } else {
        const card = flashcards[cardPosition]
        cardTitulos[1].innerText = card.titulo
        cardSubTitulos[1].innerText = card.quantidadeQuestoes > 1 ? `${card.quantidadeQuestoes} questões` : '1 questão'
    }
}

function mostrarColecao() {
    document.querySelector('.no-card').setAttribute('hidden', '')
    document.querySelector('.colecao__container').removeAttribute('hidden')
    document.querySelector('.nova-colecao__container').removeAttribute('hidden')
}

function esconderColecao() {
    document.querySelector('.no-card').removeAttribute('hidden')
    document.querySelector('.colecao__container').setAttribute('hidden', '')
    document.querySelector('.nova-colecao__container').setAttribute('hidden', '')    
}

function proximosCards() {
    if (flashcards) {
        if (screen.width > 670) {
            if (cardInterval + 3 < flashcards.length)
                cardInterval += 3
            else 
                cardInterval = 0
        } else {
            if (cardPosition + 1 < flashcards.length)
                cardPosition++
            else
                cardPosition = 0
        }
        preencherCards()
    }
}

function anterioresCards() {
    if (flashcards) {
        if (screen.width > 670) {
            if (cardInterval - 3 < 0)
                cardInterval = 0
            else 
                cardInterval -= 3
        } else {
            if (cardPosition - 1 < 0)
                cardPosition = 0
            else
                cardPosition--
        }
        preencherCards()
    }
}

function getCardById(id) {
    if (flashcards.length === 1 && id != 1) return
    
    if (screen.width > 670 && flashcards.length > 1) {
        return flashcards[cardInterval + parseInt(id)]
    } else {
        return flashcards[cardPosition]
    }
}

function play(id) {
    if (flashcards) {
        const card = getCardById(id)
        if (card) {
            localStorage.setItem('cardAtual', JSON.stringify(card))
            const url = window.location.href.split('/collection')
            window.location.href = url[0] + '/play/index.html'
        }   
    }
}

function criar() {
    const url = window.location.href.split('/collection')
    window.location.href = url[0] + '/create/criar.html'
}

function editar(id) {
    if (flashcards) {
        const card = getCardById(id)
        if (card) {
            const url = window.location.href.split('/collection')
            window.location.href = url[0] + `/edit-card/edit.html?titulo=${card.titulo}`
        }   
    }
}

function mostrarModal(id) {
    if (flashcards) {
        idToDelete = id
        document.querySelector('.modal__container').removeAttribute('hidden')
    }
}

function esconderModal() {
    document.querySelector('.modal__container').setAttribute('hidden', '')
}

function excluir() {
    if (idToDelete != -1) {
        const card = getCardById(idToDelete)
        if(card) {
            const index = flashcards.indexOf(card)
            flashcards.splice(index, 1)
            localStorage.setItem('lista', JSON.stringify({listas: flashcards}))
            main()
        }
        esconderModal()
    }
}