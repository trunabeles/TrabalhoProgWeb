function exibirListaDoLocalStorage() {
    // Verifica se o localStorage é suportado pelo navegador
    if (typeof (Storage) !== "undefined") {
        const storage = JSON.parse(localStorage.getItem("lista"))
        if (storage.listas.length) {
            var lista = JSON.parse(localStorage.getItem("lista"));
            // Percorre a lista de itens do localStorage
            lista.listas.forEach(function (item, index) {
                // Cria um elemento <div> para representar o card
                var cardElement = document.createElement("div");
                cardElement.style.width = "250px";
                cardElement.style.height = "250px";
                cardElement.style.backgroundColor = "white";
                cardElement.style.borderRadius = "10px";
                cardElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                cardElement.style.margin = "20px";
                cardElement.style.display = "flex";
                cardElement.style.flexDirection = "column";
                cardElement.style.justifyContent = "space-between";

                // Cria um elemento <h3> para exibir o título da lista
                var titleElement = document.createElement("h3");
                titleElement.textContent = item.titulo;
                // Cria um elemento <p> para exibir a quantidade de questões da lista
                var questionsElement = document.createElement("p");
                questionsElement.textContent = item.quantidadeQuestoes + "  questões";

                // Cria um elemento <a> para representar o link de edição
                var tagElement = document.createElement("div");
                var editLinkElement = document.createElement("a");
                editLinkElement.href = "../edit-card/edit.html?titulo=" + item.titulo;

                var editRemoveLink = document.createElement("a")
                editRemoveLink.addEventListener('click', function () {
                    lista.listas.splice(index, 1)
                    localStorage.setItem('lista', JSON.stringify(lista));
                    window.alert('Card Removido')
                    location.reload();
                });;
                tagElement.appendChild(editLinkElement)
                tagElement.appendChild(editRemoveLink)
                var playLink = document.createElement("a")
                playLink.textContent = "Responder";
                playLink.addEventListener('click', function () {
                    window.location.href = '../play/index.html?index=' + encodeURIComponent(index);
                });;

                // Adiciona os elementos ao card
                cardElement.appendChild(tagElement);
                cardElement.appendChild(titleElement);
                cardElement.appendChild(questionsElement);
                cardElement.appendChild(playLink);

                playLink.className = 'btn-response'
                tagElement.className = 'header-card'
                cardElement.className = 'card'
                // Adiciona o card à div com id "resultado"
                document.getElementById("resultado").appendChild(cardElement);
            });
        } else {
            document.getElementById("resultado").innerHTML = `
            <div class="card-no-list">
            <p>Ops.. <br/>Parece que você ainda não possui nenhuma lista de cards</p>
            <a type="button"class="btn-no-list btn btn-primary" href="../create/criar.html">Criar uma coleção</a>
            <p class="card-no-list-last-p">Clique no botão acima para adicionar uma nova</p>
            </div>`;
        }


    } else {
        document.getElementById("resultado").textContent = "Desculpe, o seu navegador não suporta o localStorage.";
    }
}

// Chamada da função para exibir o objeto no localStorage
exibirListaDoLocalStorage();
