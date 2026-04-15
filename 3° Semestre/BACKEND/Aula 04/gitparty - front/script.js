const base_url = "http://localhost:3000/"

const eventos = []

const modaleventos = document.getElementById("modaleventos")
const formeventos = document.getElementById("formeventos")
const busca = document.getElementById("busca")

// ---------------- MODAL EVENTOS ----------------

function abrirModal() {
    modaleventos.style.display = "flex"
}

function fecharModal() {
    modaleventos.style.display = "none"
}

// ---------------- CADASTRAR EVENTO ----------------

if (formeventos) {

    formeventos.addEventListener("submit", function (e) {

        e.preventDefault()

        const obj = {
            img: formeventos.url.value,
            titulo: formeventos.titulo.value,
            descricao: formeventos.descricao.value,
            data_evento: formeventos.data_evento.value,
            local: formeventos.local.value,
            capacidade_max: Number(formeventos.capacidade_max.value)
        }

        fetch(base_url + "eventos/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(novoEvento => {

            eventos.push(novoEvento)

            rendereventos()

            formeventos.reset()

            fecharModal()

        })

    })

}

// ---------------- LISTAR EVENTOS ----------------

function listareventos() {

    fetch(base_url + "eventos/listar")

        .then(res => res.json())

        .then(data => {

            eventos.length = 0

            data.forEach(e => {
                eventos.push(e)
            })

            rendereventos()

        })

}

listareventos()

// ---------------- RENDER EVENTOS ----------------

function rendereventos(lista = eventos) {

    const main = document.querySelector("main")

    if (!main) return

    main.innerHTML = ""

    lista.forEach((e) => {

        const card = document.createElement("div")

        card.classList.add("card")

        card.innerHTML = `
            <img src="${e.img || e.url}" alt="${e.titulo}">
            <h2>${e.titulo}</h2>
            <button onclick="verDetalhes(${e.id})">Ver detalhes</button>
        `

        main.appendChild(card)

    })

}

// ---------------- BUSCA ----------------

if (busca) {

    busca.addEventListener("input", function () {

        const texto = this.value.toLowerCase()

        const filtrados = eventos.filter(e =>
            e.titulo.toLowerCase().includes(texto)
        )

        rendereventos(filtrados)

    })

}

// ---------------- DETALHES DO EVENTO ----------------

const params = new URLSearchParams(window.location.search)

const id = params.get("id")

if (id) {

    fetch(base_url + `eventos/buscar/${id}`)

        .then(res => res.json())

        .then(evento => {

            const div = document.getElementById("detalhes")

            if (!div) return

            div.innerHTML = `
            <h2>${evento.titulo}</h2>
            <img src="${evento.img || evento.url}" width="300">
            <p><b>Descrição:</b> ${evento.descricao}</p>
            <p><b>Local:</b> ${evento.local}</p>
            <p><b>Data:</b> ${evento.data_evento}</p>
            <p><b>Capacidade:</b> ${evento.capacidade_max}</p>
            <button onclick="abrirModalImagem()">Enviar imagem</button>

            `
        })

}
function verDetalhes(id){
    window.location.href = `detalhes.html?id=${id}`
}

// ---------------- ABRIR MODAL IMAGEM ----------------

function abrirModalImagem() {
    const modal = document.getElementById("modalImagem")

    if (modal) {
        modal.style.display = "block"
    }
}

function fecharModalImagem() {
    const modal = document.getElementById("modalImagem")

    if (modal) {
        modal.style.display = "none"
    }
}

// ---------------- ENVIAR IMAGEM ----------------

function enviarImagem() {

    const file = document.getElementById("imagem").files[0]

    if (!file) {
        alert("Selecione uma imagem")
        return
    }

    const formData = new FormData()

    formData.append("imagem", file)

    fetch(base_url + `eventos/${id}/imagem`, {

        method: "POST",

        body: formData

    })
    .then(() => {

        alert("Imagem enviada com sucesso!")

        fecharModalImagem()

    })

}