let lista = '{"listas":[]}';
let questoes = '{"questoes":[]}';
let qntQuestoes = 0;
function enviarFormulario() {
    if(!verificaCampos()){
        document.getElementById("textoModal").innerHTML = "<b>Preencha TODOS os campos do formulário!!</b>";
        document.getElementById("imagemExclamacao").hidden = false;
        $('#exampleModal').modal('show');
    }
    else
        montarObjeto();

    console.log(verificaCampos());
}
function verificaCampos(){
    if(document.getElementById("descricao").value=="")
        return false;
    
    if(document.getElementById("alt1").value=="")
        return false;

    if(document.getElementById("alt2").value=="")
        return false;

    if(document.getElementById("alt3").value=="")
        return false;
    
    if(document.getElementById("alt4").value=="")
        return false;

    if(!document.getElementById("opc1").checked &&
        !document.getElementById("opc2").checked &&
        !document.getElementById("opc3").checked &&
        !document.getElementById("opc4").checked)
        return false;

    return true;
}
function fecharModal(){
    document.getElementById("imagemExclamacao").hidden = true;
    document.getElementById("imagemTrue").hidden = true;
    $('#exampleModal').modal('hide');
}
function montarObjeto(){
    qntQuestoes = qntQuestoes+1;
    var obj = JSON.parse(questoes);
    let questaoAtual = {
                pergunta: document.getElementById("descricao").value,
                alternativas: [document.getElementById("alt1").value, document.getElementById("alt2").value,
                                document.getElementById("alt1").value, document.getElementById("alt1").value],
                correta: 0 };
    obj['questoes'].push(questaoAtual);
    str = JSON.stringify(obj);
    questoes=str;
    document.getElementById("qnt").innerHTML = "Qnt cards: "+qntQuestoes;
    limparCampos();
    //console.log(questoes);
    //cards.add(questaoAtual);
}
function salvarLista(){
    if(qntQuestoes==0)
        montarModalAlerta("Necessário ter pelo menos um card cadastrado!");
    else if(document.getElementById("nomeLista").value=="")
        montarModalAlerta("Necessário informar o nome da lista!");
    else{
        var obj = JSON.parse(lista);
        qst = JSON.parse(questoes);
        novaLista ={
            titulo: document.getElementById("nomeLista").value,
            quantidadeQuestoes: qntQuestoes,
            questoes: qst['questoes']
        }
        obj['listas'].push(novaLista);
        str = JSON.stringify(obj);
        lista=str;
        localStorage.setItem('lista', lista);

        document.getElementById("nomeLista").value = "";
        document.getElementById("qnt").innerHTML = "Qnt cards: 0";
        qntQuestoes = 0;

        montarModalSalvar();
    }
    //console.log(lista);
}

function limparCampos(){
    document.getElementById("descricao").value = "";
    document.getElementById("alt1").value = "";
    document.getElementById("alt2").value = "";
    document.getElementById("alt3").value = "";
    document.getElementById("alt4").value = "";
    var cboxes = document.getElementsByName('flexRadioDefault');
    var len = cboxes.length;
    for (var i=0; i<len; i++) {
        cboxes[i].checked = false;
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
// {
//     titulo: document.getElementById("nomeLista").value,
//     quantidadeQuestoes: qntQuestoes,
//     questoes: [