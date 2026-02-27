const modalcli = document.getElementById("modalcli")
var clientes = JSON.parse(localStorage.getItem("clientes")) || []

renderizartabela()

function salvarlocal(){
    localStorage.setItem("clientes", JSON.stringify(clientes));
    window.location.reload();
}

function abrirmodal(){
    modalcli.style.display="block";
}
function fecharmodal(){
    modalcli.style.display="none";
}
const formcli = document.getElementById("formcli");
formcli.addEventListener("submit", e =>{
    e.preventDefault()
    const obj = {
        cpf: formcli.cpf.value,
        nome: formcli.nome.value,
        sobrenome: formcli.sobrenome.value,
        nascimento: formcli.nascimento.value
    }
    clientes.push(obj)
    salvarlocal();
})

function renderizartabela(){
    const corpo = document.getElementById("dados")
    corpo.innerHTML = "";

    clientes.forEach((c, i) =>{
        corpo.innerHTML += `
        <tr>
        <td>${c.cpf}</td>
        <td>${c.nome}</td>
        <td>${c.sobrenome}</td>
        <td>${c.nascimento}</td>
        <td><button onclick="excluir(${i})">Excluir</td>
        </tr>`
    })
}
function excluir(indice){
    clientes.splice(indice, 1);
    renderizartabela();
}