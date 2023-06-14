const flashcards = JSON.parse(localStorage.getItem('lista'))?.listas
const cardAtual = JSON.parse(localStorage.getItem('cardAtual'))
const modal = document.querySelector('#modal')

let questaoAtual = 0
let selected = false
let questoesCorretas = 0
let questoesErradas = 0

function main() {
    selected = false

    if (!cardAtual) return;
    
    if (questaoAtual < cardAtual.questoes.length) {
        preencherPergunta()
        preencherAlternativas()
    }
    
    if (questaoAtual === cardAtual.questoes.length) {
        showModal()
    }
}

main()

function preencherPergunta() {
    const pergunta = document.querySelector('#card-question__description')
    pergunta.innerText = cardAtual.questoes[questaoAtual].pergunta
}

function preencherAlternativas() {
    const divsAlternativas = document.querySelectorAll('.card-answer__option')
    for (let i = 0; i < divsAlternativas.length; i++) {
        divsAlternativas[i].innerText = cardAtual.questoes[questaoAtual].alternativas[i]
    }
}

function handleClick(target) {
    if (!selected && questaoAtual < cardAtual.questoes.length) {
        let classe;
        if (cardAtual.questoes[questaoAtual].correta == target.id) {
            classe = 'sucess'
            questoesCorretas++
        } else {
            classe = 'error'
            questoesErradas++
            document.getElementById(cardAtual.questoes[questaoAtual].correta).classList.add('sucess')
        }
        target.classList.add(classe)
        selected = true
        setTimeout(()=> proximaQuestao(target, classe), 3000)
    }
}

function proximaQuestao(target, classe) {
    target.classList.remove(classe)
    document.getElementById(cardAtual.questoes[questaoAtual].correta).classList.remove('sucess')
    questaoAtual++
    main()
}

function showModal() {
    const acertos = document.querySelector('#acertos')
    acertos.innerText = questoesCorretas === 1? `${questoesCorretas} Acerto` : `${questoesCorretas} Acertos`
    const erros = document.querySelector('#erros')
    erros.innerText = questoesErradas === 1? `${questoesErradas} Erro` : `${questoesErradas} Erros` 
    modal.removeAttribute('hidden')
    questoesCorretas = 0
    questoesErradas = 0
}

function tentarNovamente() {
    questaoAtual = 0
    modal.setAttribute('hidden', '')
    main()
}

function redirecionarParaHome() {
    questaoAtual = 0
    modal.setAttribute('hidden', '')
    const url = window.location.href.split('/play')
    window.location.href = url[0] + '/home/home.html'
}