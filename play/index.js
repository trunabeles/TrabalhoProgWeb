//nome do item armazenado no localStorage: flashcards
// const flashcards = localStorage.getItem('flashcards')
const mockFlashcards = [
    {
        titulo: 'História do Brasil',
        quantidadeQuestoes: 3,
        questoes: [
            {
                pergunta: 'Quem descobriu o Brasil?',
                alternativas: ['Cabral', 'Colombinho', 'Indiano', 'Espanhois'],
                correta: 1
            },
            {
                pergunta: 'Quem descobriu o Brasil?',
                alternativas: ['Cabral', 'Colombinho', 'Indiano', 'Espanhois'],
                correta: 1
            },
            {
                pergunta: 'Quem descobriu o Brasil?',
                alternativas: ['Cabral', 'Colombinho', 'Indiano', 'Espanhois'],
                correta: 1
            }
        ]
    },
    {
        titulo: 'Geografia do Brasil',
        quantidadeQuestoes: 4,
        questoes: [
            {
                pergunta: 'O brasil tem quantos estados?',
                alternativas: ['-1', '17', '26', '38'],
                correta: 2
            },
            {
                pergunta: 'O brasil tem quantos estados?',
                alternativas: ['-1', '17', '26', '38'],
                correta: 2
            },
            {
                pergunta: 'O brasil tem quantos estados?',
                alternativas: ['-1', '17', '26', '38'],
                correta: 2
            }
        ]
    }
]
//nome do item armazenado no localStorage: cardAtual
// const flashcards = localStorage.getItem('cardAtual')
const mockCardAtual = {
    titulo: 'Titulo dos Cards',
    quantidadeQuestoes: 4,
    questoes: [
        {
            pergunta: 'Pergunta 01?',
            alternativas: ['Alternativa 01', 'Alternativa 02', 'Alternativa 03', 'Alternativa 04'],
            correta: 0
        },
        {
            pergunta: 'Pergunta 02?',
            alternativas: ['Alternativa 05', 'Alternativa 06', 'Alternativa 07', 'Alternativa 08'],
            correta: 1
        },
        {
            pergunta: 'Pergunta 03?',
            alternativas: ['Alternativa 09', 'Alternativa 10', 'Alternativa 11', 'Alternativa 12'],
            correta: 2
        }
    ]
}

let questaoAtual = 0
let selected = false
const modal = document.querySelector('#modal')
let questoesCorretas = 0
let questoesErradas = 0

function main() {
    selected = false
    if (!mockCardAtual) {
        return
    }

    if (questaoAtual < mockCardAtual.questoes.length) {
        preencherPergunta()
        preencherAlternativas()
    }
    
    if (questaoAtual === mockCardAtual.questoes.length) {
        showModal()
    }
}

main()

function preencherPergunta() {
    const pergunta = document.querySelector('#card-question__description')
    pergunta.innerText = mockCardAtual.questoes[questaoAtual].pergunta
}

function preencherAlternativas() {
    const divsAlternativas = document.querySelectorAll('.card-answer__option')
    for (let i = 0; i < divsAlternativas.length; i++) {
        divsAlternativas[i].innerText = mockCardAtual.questoes[questaoAtual].alternativas[i]
    }
}

function handleClick(target) {
    if (!selected && questaoAtual < mockCardAtual.questoes.length) {
        let classe;
        if (mockCardAtual.questoes[questaoAtual].correta == target.id) {
            classe = 'sucess'
            questoesCorretas++
        } else {
            classe = 'error'
            questoesErradas++
            document.getElementById(mockCardAtual.questoes[questaoAtual].correta).classList.add('sucess')
        }
        target.classList.add(classe)
        selected = true
        setTimeout(()=> proximaQuestao(target, classe), 3000)
    }
}

function proximaQuestao(target, classe) {
    target.classList.remove(classe)
    document.getElementById(mockCardAtual.questoes[questaoAtual].correta).classList.remove('sucess')
    questaoAtual++
    main()
}

function showModal() {
    const acertos = document.querySelector('#acertos')
    acertos.innerText = `${questoesCorretas} Acertos`
    const erros = document.querySelector('#erros')
    erros.innerText = `${questoesErradas} Erros`
    modal.classList.add('show')
    questoesCorretas = 0
    questoesErradas = 0
}

function tentarNovamente() {
    questaoAtual = 0
    modal.classList.remove('show')
    main()
}

function redirecionarParaHome() {
    questaoAtual = 0
    modal.classList.remove('show')
    main()
}