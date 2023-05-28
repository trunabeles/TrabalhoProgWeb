let lista = '{"listas":[]}';
let questoes = '{"questoes":[]}';
let qntQuestoes = 0;
function enviarFormulario() {
    if(!verificaCampos())
        $('#exampleModal').modal('show');
    else
        montarObjeto();

    console.log(verificaCampos());
}
function verificaCampos(){

    if(document.getElementById("nomeLista").value=="")
        return false;
    
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
    console.log(document.getElementById("nomeLista").value=="");
}
function fecharModal(){
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
    //console.log(questoes);
    //cards.add(questaoAtual);
}
function salvarLista(){
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
    //console.log(lista);
}

// {
//     titulo: document.getElementById("nomeLista").value,
//     quantidadeQuestoes: qntQuestoes,
//     questoes: [