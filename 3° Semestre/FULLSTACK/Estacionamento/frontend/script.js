

const api = "http://localhost:3000";

/////////////////////////////automoveis

const formAutomovel = document.getElementById("formAutomovel");
const listaAutomoveis = document.getElementById("listaAutomoveis");

if(formAutomovel){

    formAutomovel.addEventListener("submit", async (e) => {

        e.preventDefault();

        const automovel = {

            placa: placa.value,
            proprietario: proprietario.value,
            tipo: tipo.value,
            modelo: modelo.value,
            telefone: telefone.value,
            marca: marca.value,
            cor: cor.value || null,
            ano: ano.value ? Number(ano.value) : null
        };

        await fetch(`${api}/automovel/cadastrar`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(automovel)
        });

        formAutomovel.reset();

        carregarAutomoveis();
    });

    async function carregarAutomoveis(){

        const response = await fetch(`${api}/automovel/listar`);

        const dados = await response.json();

        listaAutomoveis.innerHTML = "";

        dados.forEach(item => {

            listaAutomoveis.innerHTML += `

                <div class="card">

                    <h3>${item.modelo}</h3>

                    <p>Placa: ${item.placa}</p>

                    <p>Proprietário: ${item.proprietario}</p>

                    <p>Marca: ${item.marca}</p>

                    <button onclick="excluirAutomovel('${item.placa}')">

                        Excluir

                    </button>

                </div>
            `;
        });
    }

    window.excluirAutomovel = async function(placa){

        await fetch(`${api}/automovel/excluir/${placa}`, {

            method: "DELETE"
        });

        carregarAutomoveis();
    }

    carregarAutomoveis();
}

//////////////////////////////////estadias

const formEstadia = document.getElementById("formEstadia");
const listaEstadias = document.getElementById("listaEstadias");

if(formEstadia){

    formEstadia.addEventListener("submit", async (e) => {

        e.preventDefault();

        const estadia = {

            automovelPlaca: automovelPlaca.value,
            valorHora: Number(valorHora.value)
        };

        await fetch(`${api}/estadia/cadastrar`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(estadia)
        });

        formEstadia.reset();

        carregarEstadias();
    });

    async function carregarEstadias(){

        const response = await fetch(`${api}/estadia/listar`);

        const dados = await response.json();

        listaEstadias.innerHTML = "";

        dados.forEach(item => {

            listaEstadias.innerHTML += `

                <div class="card">

                    <p>Placa: ${item.automovelPlaca}</p>

                    <p>Entrada:
                        ${new Date(item.entrada).toLocaleString()}
                    </p>

                    <p>Valor Hora:
                        R$ ${item.valorHora}
                    </p>

                    <p>Valor Total:
                        ${item.valorTotal ? "R$ " + item.valorTotal : "Em aberto"}
                    </p>

                    <button onclick="finalizarEstadia(${item.id})">

                        Finalizar

                    </button>

                    <button onclick="excluirEstadia(${item.id})">

                        Excluir

                    </button>

                </div>
            `;
        });
    }

    window.finalizarEstadia = async function(id){

        await fetch(`${api}/estadia/atualizar/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                saida: new Date()
            })
        });

        carregarEstadias();
    }

    window.excluirEstadia = async function(id){

        await fetch(`${api}/estadia/excluir/${id}`, {

            method: "DELETE"
        });

        carregarEstadias();
    }

    carregarEstadias();
}