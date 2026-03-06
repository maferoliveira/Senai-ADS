const modalfilm = document.getElementById("modalfilm")
var filmes = JSON.parse(localStorage.getItem("filmes")) || []

renderizartabela();

function savelocal() {
    localStorage.setItem("filmes", JSON.stringify(filmes));
    window.location.reload();
}
function openmodal() {
    modalfilm.style.display = "block";
}
function closemodal() {
    modalfilm.style.display = "none";
}

const formfilm = document.getElementById("formfilm")
formfilm.addEventListener("submit", e => {
    e.preventDefault()
    const objeto = {
        url: formfilm.url.value,
        name: formfilm.name.value,
        gender: formfilm.gender.value,
        year: formfilm.year.value,
        production: formfilm.production.value
    }
    filmes.push(objeto)
    savelocal()
})

const urldigitada = document.querySelector('input[name="url"]').value;
function renderizartabela() {
    const corpo = document.getElementById("dados")
    corpo.innerHTML = ""

    filmes.forEach((f, i) => {
        corpo.innerHTML += `
    <tr>
    <td><img src="${urldigitada}" class="poster"></td>
    <td>${f.name}</td>
    <td>${f.gender}</td>
    <td>${f.year}</td>
    <td>${f.production}</td>
    <td><button id="e" onclick="exclude(${i})">Delete</td>
    </tr>`
    })
}
function exclude(indice) {
    filmes.splice(indice, 1);
    renderizartabela();
}