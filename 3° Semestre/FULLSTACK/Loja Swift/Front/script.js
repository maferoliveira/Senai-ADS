const url = 'http://localhost:3000';
const produtos = [];

carregarprodutos();
let produtoAtual = null;

function carregarprodutos(){
    fetch(url + '/produto/listar')
    .then(response => response.json())
    .then(data =>{
        produtos.length = 0;
        produtos.push(...data);
        listarCards();
    })
    .catch(e =>alert('Problemas com a conexão da API'));
}

function listarCards(){
    const container = document.querySelector('main');
    container.innerHTML = '';

    produtos.forEach(produto =>{
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h3>${produto.nome}</h3>
        <img src="${produto.img}"alt="${produto.nome}">
        <p>R$${produto.valor}</p>
        `;
        card.onclick = () => abrirProduto(produto);
        container.appendChild(card);
    });
}
function abrirProduto(produto){
    produtoAtual = produto;
    nomeProduto.innerText = produto.nome;
    nomeEdit.value = produto.nome;
    imgProduto.src = produto.img;
    imgEdit.value = produto.img;
    descricaoEdit.value = produto.descricao;
    quantidadeEdit.value = produto.quantidade;
    valorEdit.value = produto.valor;
    detalhes.classList.remove('oculto');
}
imgEdit.addEventListener("input", () =>{
    imgProduto.src = imgEdit.value;
});

document.querySelector('#formcadastro').addEventListener('submit', function(e){
    e.preventDefault();
    const novoProduto = {
        nome: nome.value,
        descricao: descricao.value,
        quantidade: quantidade.value ? Number (valor.value) : null,
        img: urlImagem.value,
        valor: valor.value ? Number (valor.value) : null
    }
    fetch(url+ '/produto/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(novoProduto)
    })
    .then(()=>{
        alert("Produto adicionado com sucesso!");
        cadastro.classList.add('oculto');
        carregarprodutos();
    })
    .catch(()=>alert("Erro ao salvar Produto"));
});

function salvarEdicao(){
    const ProdutoEditado = {
        nome: nomeEdit.value,
        descricao: descricaoEdit.value,
        quantidade: quantidadeEdit.value,
        img: imgEdit.value,
        valor: valorEdit.value ? Number(valorEdit.value): null
    }
    fetch(url + '/produto/atualizar/' + produtoAtual.id, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(ProdutoEditado)
    })
    .then(res =>{
        if(!res.ok) throw new Error();
        return res.json();
    })
    .then(()=>{
        alert("Produto atualizado com sucesso!");
        detalhes.classList.add('oculto');
        carregarprodutos();
    })
    .catch(()=>{
        alert("Erro ao editar Produto.");
    })
}

function excluirProdutoAtual(){
    if(!confirm("Deseja excluir esse Produto?"))return;
    fetch(url + '/produto/excluir/' + produtoAtual.id, {
        method: 'DELETE'
    })
    .then(()=>{
        alert("Produto excluido com sucesso.");
        detalhes.classList.add('oculto');
        carregarprodutos();
    })
    .catch(() => alert("Erro ao excluir Produto."));
}