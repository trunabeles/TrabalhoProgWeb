let lista = '{"listas":[]}';
let questoes = '{"questoes":[]}';
let qntQuestoes = 0;
let idQuestaoAtual=0;
let ehRevisao =false;
function enviarFormulario() {
    if(!verificaCampos()){
        document.getElementById("textoModal").innerHTML = "<b>Preencha TODOS os campos do formulário!!</b>";
        document.getElementById("imagemExclamacao").hidden = false;
        $('#exampleModal').modal('show');
    }
    else if(!ehRevisao)
        montarObjeto();
}
function verificaCampos(){
    if(document.getElementById("descricao").value.trim()=="")
        return false;
    
    if(document.getElementById("alt1").value.trim()=="")
        return false;

    if(document.getElementById("alt2").value.trim()=="")
        return false;

    if(document.getElementById("alt3").value.trim()=="")
        return false;
    
    if(document.getElementById("alt4").value.trim()=="")
        return false;

    if(!document.getElementById("opc1").checked &&
        !document.getElementById("opc2").checked &&
        !document.getElementById("opc3").checked &&
        !document.getElementById("opc4").checked)
        return false;

    return true;
}
function fecharModal(){
    if(!document.getElementById("imagemTrue").hidden)
        redirecionarParaColecao()

    document.getElementById("imagemExclamacao").hidden = true;
    document.getElementById("imagemTrue").hidden = true;
    $('#exampleModal').modal('hide');
}
function montarObjeto(){
    qntQuestoes = qntQuestoes+1;
    var obj = JSON.parse(questoes);
    let questaoAtual = {
        pergunta: document.getElementById("descricao").value.trim(),
        alternativas: [
            document.getElementById("alt1").value.trim(), 
            document.getElementById("alt2").value.trim(),
            document.getElementById("alt3").value.trim(),
            document.getElementById("alt4").value.trim()
        ],
        correta: verificaAlternativaCorreta() 
    };
    obj['questoes'].push(questaoAtual);
    str = JSON.stringify(obj);
    questoes=str;
    document.getElementById("qnt").innerHTML = "Qnt cards: "+qntQuestoes;
    idQuestaoAtual=idQuestaoAtual+1;
    limparCampos();
}
function getPrevious(){
    if(idQuestaoAtual-1 <0)
        return;
    else{
        ehRevisao = true;
        var obj = JSON.parse(questoes);
        var objPrev = obj['questoes'][idQuestaoAtual-1];
        preencheCamposQuestionario(objPrev);
        idQuestaoAtual = idQuestaoAtual-1;
    }
}
function getNext(){
    var obj = JSON.parse(questoes);
    if(idQuestaoAtual+1 >= obj['questoes'].length){
        if(idQuestaoAtual+1 == obj['questoes'].length)
            idQuestaoAtual=idQuestaoAtual+1;
        limparCampos();
    }
    else{
        ehRevisao = true;
        var objNext = obj['questoes'][idQuestaoAtual+1];
        preencheCamposQuestionario(objNext);
        idQuestaoAtual = idQuestaoAtual+1;
    }
}
function verificaAlternativaCorreta(){
    if(document.getElementById("opc1").checked)
        return 0;
    else if(document.getElementById("opc2").checked)
        return 1;   
    else if(document.getElementById("opc3").checked)
        return 2;
    else
        return 3;
}
function salvarLista(){
    if(qntQuestoes==0)
        montarModalAlerta("Necessário ter pelo menos um card cadastrado!");
    else if(document.getElementById("nomeLista").value.trim()=="")
        montarModalAlerta("Necessário informar o nome da lista!");
    else{
        listaStorage = localStorage.getItem('lista');

        if(listaStorage!= null){
            
            listaStorage = JSON.parse(listaStorage);
            qst = JSON.parse(questoes);

            novaLista ={
                titulo: document.getElementById("nomeLista").value,
                quantidadeQuestoes: qntQuestoes,
                questoes: qst['questoes']
            }

            listaStorage["listas"].push(novaLista);
            localStorage.setItem('lista', JSON.stringify(listaStorage));
        }
        else{
            var obj = JSON.parse(lista);
            qst = JSON.parse(questoes);
            novaLista ={
                titulo: document.getElementById("nomeLista").value.trim(),
                quantidadeQuestoes: qntQuestoes,
                questoes: qst['questoes']
            }
            obj['listas'].push(novaLista);
            str = JSON.stringify(obj);
            lista=str;
            localStorage.setItem('lista', lista);
        }

        document.getElementById("nomeLista").value = "";
        document.getElementById("qnt").innerHTML = "Qnt cards: 0";
        qntQuestoes = 0;
        idQuestaoAtual=0;
        
        limparCampos();
        montarModalSalvar();
    }
}

function limparCampos(){
    document.getElementById("descricao").value = "";
    document.getElementById("descricao").disabled = false;
    document.getElementById("alt1").value = "";
    document.getElementById("alt1").disabled = false;
    document.getElementById("alt2").value = "";
    document.getElementById("alt2").disabled = false;
    document.getElementById("alt3").value = "";
    document.getElementById("alt3").disabled = false;
    document.getElementById("alt4").value = "";
    document.getElementById("alt4").disabled = false;

    ehRevisao = false;

    var cboxes = document.getElementsByName('flexRadioDefault');
    var len = cboxes.length;
    for (var i=0; i<len; i++) {
        cboxes[i].checked = false;
        cboxes[i].disabled = false;
    }
}

function montarModalSalvar(){
    document.getElementById("textoModal").innerHTML = "<b>LISTA SALVA COM SUCESSO</b>";
    document.getElementById("imagemTrue").hidden = false;
    $('#exampleModal').modal('show');
}
function montarModalAlerta(texto){
    document.getElementById("textoModal").innerHTML = "<b>" +texto+"</b>";
    document.getElementById("imagemExclamacao").hidden = false;
    $('#exampleModal').modal('show');
}

function redirecionarParaColecao() {
    const url = window.location.href.split('/create')
    window.location.href = url[0] + '/collection/index.html'
}

function preencheCamposQuestionario(obj){
    document.getElementById("descricao").value = obj['pergunta'];
    document.getElementById("descricao").disabled = true;
    document.getElementById("alt1").value = obj['alternativas'][0];
    document.getElementById("alt1").disabled = true;
    document.getElementById("alt2").value = obj['alternativas'][1];
    document.getElementById("alt2").disabled = true;
    document.getElementById("alt3").value = obj['alternativas'][2];
    document.getElementById("alt3").disabled = true;
    document.getElementById("alt4").value = obj['alternativas'][3];
    document.getElementById("alt4").disabled = true;

    document.getElementById("btn-salvar").disabled = true;

    var opcCertaName = "opc"+(obj['correta']+1);
    document.getElementById(opcCertaName).checked = true;
    var cboxes = document.getElementsByName('flexRadioDefault');
    var len = cboxes.length;
    for (var i=0; i<len; i++) {
        cboxes[i].disabled = true;
    }

}