const url = "https://receitasapi-b-2025.vercel.app"
const modalreceitas = document.getElementById("modalreceitas")

// pega receitas salvas
const receitas =  [];

listarreceitas()

// buscar receitas da api
function listarreceitas() {
    fetch(`${url}/receitas`)
        .then(response => response.json())
        .then(data => {

            receitas.length = 0

            data.forEach(receita => {
                receitas.push(receita)
            })

            renderreceitas()
        })
}

// criar cards
function renderreceitas() {
    const main = document.querySelector("main")
    main.innerHTML = ""

    receitas.forEach((r, i) => {

        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
            <img src="${r.img || r.url}" alt="${r.nome}">
            <h2>${r.nome}</h2>
            <button onclick="verdetalhes(${i})">Ver detalhes</button>
        `

        main.appendChild(card)
    })
}

// ver detalhes
function verdetalhes(indice) {

    const r = receitas[indice]

    const modal = document.createElement("div")
    modal.classList.add("modal")
    modal.style.display = "flex"

    modal.innerHTML = `
        <div class="modal-content">
            <h2>${r.nome}</h2>
            <img src="${r.img || r.url}" style="width:100%">
            <p><b>Tipo:</b> ${r.tipo}</p>
            <p><b>Ingredientes:</b> ${r.ingredientes}</p>
            <p><b>Modo de fazer:</b> ${r.modoFazer}</p>
            <p><b>Custo:</b> R$ ${r.custoAproximado}</p>

            <button onclick="this.parentElement.parentElement.remove()">Fechar</button>
        </div>
    `

    document.body.appendChild(modal)
}

// salva no localstorage
// function salvarLocal() {
//     localStorage.setItem("receitas", JSON.stringify(receitas))
// }

// abre formulario
function abrirModal() {
    modalreceitas.style.display = "block"
}

// fecha formulario
function fecharModal() {
    modalreceitas.style.display = "none"
}

// formulario
const formreceitas = document.getElementById("formreceitas")

formreceitas.addEventListener("submit", function (event) {

    event.preventDefault()

    const obj = {
        nome: formreceitas.nome.value,
        tipo: formreceitas.tipo.value,
        ingredientes: formreceitas.ingredientes.value,
        modoFazer: formreceitas.modoFazer.value,
        img: formreceitas.url.value,
        custoAproximado: Number(formreceitas.custoAproximado.value)
    };

  
    fetch(`${url}/receitas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(obj)
    })
        .then(response => response.json())
        .then(novaReceita => {
            receitas.push(novaReceita);
            renderreceitas();
            formreceitas.reset();
            fecharModal();
           

        })
})