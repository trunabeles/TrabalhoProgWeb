let lista = '{"listas":[]}';
let questoes = '{"questoes":[]}';
let qntQuestoes = 0;
let idQuestaoAtual = 0;
let oldQuestion = {};
let indexForm = 0
function enviarFormulario() {
    if (!verificaCampos()) {
        document.getElementById("textoModal").innerHTML = "<b>Preencha TODOS os campos do formulário!!</b>";
        document.getElementById("imagemExclamacao").hidden = false;
        $('#exampleModal').modal('show');
    }
    else
        montarObjeto();

    console.log(verificaCampos());
}
function verificaCampos() {
    if (document.getElementById("descricao").value == "")
        return false;

    if (document.getElementById("alt1").value == "")
        return false;

    if (document.getElementById("alt2").value == "")
        return false;

    if (document.getElementById("alt3").value == "")
        return false;

    if (document.getElementById("alt4").value == "")
        return false;

    if (!document.getElementById("opc1").checked &&
        !document.getElementById("opc2").checked &&
        !document.getElementById("opc3").checked &&
        !document.getElementById("opc4").checked)
        return false;

    return true;
}
function fecharModal() {
    document.getElementById("imagemExclamacao").hidden = true;
    document.getElementById("imagemTrue").hidden = true;
    $('#exampleModal').modal('hide');
}
function montarObjeto() {
    qntQuestoes = qntQuestoes + 1;
    var obj = JSON.parse(questoes);
    // const lista = JSON.parse(localStorage.getItem("lista")).listas;

    const novaPergunta = document.getElementById("descricao").value;

    // Verificar se já existe uma pergunta igual
    // const perguntaDuplicada = lista.find((questao) => questao.titulo == novaPergunta);


    let questaoAtual = {
        pergunta: novaPergunta,
        alternativas: [
            document.getElementById("alt1").value,
            document.getElementById("alt2").value,
            document.getElementById("alt3").value,
            document.getElementById("alt4").value
        ],
        correta: verificaAlternativaCorreta()
    };
    obj['questoes'].push(questaoAtual);
    str = JSON.stringify(obj);
    questoes = str;
    document.getElementById("qnt").innerHTML = "Qnt cards: " + qntQuestoes;
    idQuestaoAtual = idQuestaoAtual + 1;
    limparCampos();
    console.log(questoes);
    //cards.add(questaoAtual);
}

function getPrevious() {
    if (idQuestaoAtual - 1 < 0)
        return;
    else {
        var obj = JSON.parse(questoes);
        console.log(obj['questoes'][idQuestaoAtual - 1]);
        // document.getElementById("descricao").value = 
        // document.getElementById("alt1").value = 
        // document.getElementById("alt1").value = 
        // document.getElementById("alt1").value =
        // document.getElementById("alt1").value =
    }

}
function verificaAlternativaCorreta() {
    if (document.getElementById("opc1").checked)
        return 0;
    else if (document.getElementById("opc2").checked)
        return 1;
    else if (document.getElementById("opc3").checked)
        return 2;
    else
        return 3;
}
function salvarLista() {
    if (qntQuestoes == 0)
        montarModalAlerta("Necessário ter pelo menos um card cadastrado!");
    else if (document.getElementById("nomeLista").value == "")
        montarModalAlerta("Necessário informar o nome da lista!");
    else {
        listaStorage = localStorage.getItem('lista');
        console.log("lista: " + listaStorage);

        if (listaStorage != null) {

            listaStorage = JSON.parse(listaStorage);
            qst = JSON.parse(questoes);

            novaLista = {
                titulo: document.getElementById("nomeLista").value,
                quantidadeQuestoes: qntQuestoes,
                questoes: qst['questoes']
            }

            listaStorage["listas"].push(novaLista);
            localStorage.setItem('lista', JSON.stringify(listaStorage));
        }
        else {
            var obj = JSON.parse(lista);
            qst = JSON.parse(questoes);
            novaLista = {
                titulo: document.getElementById("nomeLista").value,
                quantidadeQuestoes: qntQuestoes,
                questoes: qst['questoes']
            }
            obj['listas'].push(novaLista);
            str = JSON.stringify(obj);
            lista = str;
            localStorage.setItem('lista', lista);
        }

        document.getElementById("nomeLista").value = "";
        document.getElementById("qnt").innerHTML = "Qnt cards: 0";
        qntQuestoes = 0;
        idQuestaoAtual = 0;

        montarModalSalvar();
    }
    //console.log(lista);
}

function limparCampos() {
    document.getElementById("descricao").value = "";
    document.getElementById("alt1").value = "";
    document.getElementById("alt2").value = "";
    document.getElementById("alt3").value = "";
    document.getElementById("alt4").value = "";
    var cboxes = document.getElementsByName('flexRadioDefault');
    var len = cboxes.length;
    for (var i = 0; i < len; i++) {
        cboxes[i].checked = false;
    }
}

function montarModalSalvar() {
    document.getElementById("textoModal").innerHTML = "<b>LISTA SALVA COM SUCESSO</b>";
    document.getElementById("imagemTrue").hidden = false;
    $('#exampleModal').modal('show');
}
function montarModalAlerta(texto) {
    document.getElementById("textoModal").innerHTML = "<b>" + texto + "</b>";
    document.getElementById("imagemExclamacao").hidden = false;
    $('#exampleModal').modal('show');
}
function handleEditform(event) {
    let list = JSON.parse(localStorage.getItem("lista"));
    let lista = JSON.parse(localStorage.getItem("lista")).listas;
    const novaPergunta = document.getElementById("descricao").value;

    let questaoAtual = {
        pergunta: novaPergunta,
        alternativas: [
            document.getElementById("alt1").value,
            document.getElementById("alt2").value,
            document.getElementById("alt3").value,
            document.getElementById("alt4").value
        ],
        correta: verificaAlternativaCorreta()
    };

    lista.map((e) => {
        if (e.titulo == document.getElementById("nomeLista").value) {
            e.questoes[indexForm] = questaoAtual
        }
    })

    list.listas.map((e) => {
        if (e.titulo == document.getElementById("nomeLista").value) {
            e.questoes[indexForm] = questaoAtual
        }
    })

    localStorage.setItem('lista', JSON.stringify(list));
    window.alert("Atualizado com sucesso!")
}
window.onload = function () {
    const novaPergunta = document.getElementById("descricao").value

    // Obtém o parâmetro "titulo" da URL
    const urlParams = new URLSearchParams(window.location.search);
    const tituloParam = urlParams.get('titulo');

    // Verifica se o objeto com o título correspondente está no localStorage
    const lista = JSON.parse(localStorage.getItem("lista"));
    const objeto = lista.listas.find(item => item.titulo === tituloParam);

    if (objeto) {
        // Preenche os campos com os valores do objeto
        document.getElementById("nomeLista").value = objeto.titulo;
        document.getElementById("descricao").value = objeto.questoes[0].pergunta;
        document.getElementById("alt1").value = objeto.questoes[0].alternativas[0];
        document.getElementById("alt2").value = objeto.questoes[0].alternativas[1];
        document.getElementById("alt3").value = objeto.questoes[0].alternativas[2];
        document.getElementById("alt4").value = objeto.questoes[0].alternativas[3];
        document.getElementById("opc" + (objeto.questoes[0].correta + 1)).checked = true;
    }
}
document.getElementById("proximaQuestao").addEventListener("click", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tituloParam = urlParams.get('titulo');

    const lista = JSON.parse(localStorage.getItem("lista")).listas;

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].titulo === tituloParam) {
            const objeto = lista[i];
            const questoes = objeto.questoes;

            console.log(objeto)
            console.log(questoes)
            // Encontre a questão atual
            const descricaoAtual = document.getElementById("descricao").value;
            let questaoAtualIndex = -1;

            for (let j = 0; j < questoes.length; j++) {
                if (questoes[j].pergunta === descricaoAtual) {
                    questaoAtualIndex = j;
                    break;
                }
            }

            // Verifique se há uma próxima questão
            if (questaoAtualIndex < questoes.length - 1) {
                indexForm = indexForm + 1
                // Obtenha a próxima questão
                const proximaQuestao = questoes[questaoAtualIndex + 1];
                // Preencha os campos com os valores da próxima questão
                document.getElementById("descricao").value = proximaQuestao.pergunta;
                document.getElementById("alt1").value = proximaQuestao.alternativas[0];
                document.getElementById("alt2").value = proximaQuestao.alternativas[1];
                document.getElementById("alt3").value = proximaQuestao.alternativas[2];
                document.getElementById("alt4").value = proximaQuestao.alternativas[3];
                document.getElementById("opc" + (proximaQuestao.correta + 1)).checked = true;
            }

            break;
        }
    }
});
document.getElementById("anteriorQuestao").addEventListener("click", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tituloParam = urlParams.get('titulo');
    const lista = JSON.parse(localStorage.getItem("lista")).listas;

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].titulo === tituloParam) {
            const objeto = lista[i];
            const questoes = objeto.questoes;

            // Encontre a questão atual
            const descricaoAtual = document.getElementById("descricao").value;
            let questaoAtualIndex = -1;

            for (let j = 0; j < questoes.length; j++) {
                if (questoes[j].pergunta === descricaoAtual) {
                    questaoAtualIndex = j;
                    break;
                }
            }

            // Verifique se há uma questão anterior
            if (questaoAtualIndex > 0) {
                indexForm = indexForm - 1
                // Obtenha a questão anterior
                const questaoAnterior = questoes[questaoAtualIndex - 1];
                // Preencha os campos com os valores da questão anterior
                document.getElementById("descricao").value = questaoAnterior.pergunta;
                document.getElementById("alt1").value = questaoAnterior.alternativas[0];
                document.getElementById("alt2").value = questaoAnterior.alternativas[1];
                document.getElementById("alt3").value = questaoAnterior.alternativas[2];
                document.getElementById("alt4").value = questaoAnterior.alternativas[3];
                document.getElementById("opc" + (questaoAnterior.correta + 1)).checked = true;
            }

            break;
        }
    }

});
function redirecionarParaHome() {
    window.location.href = "../home/home.html"
}