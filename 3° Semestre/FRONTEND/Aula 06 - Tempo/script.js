const key = "f90d7da7065d441909c71f55178a775c"
async function buscarcidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta=>resposta.json())
    colocardadosnatela(dados)
}
function colocardadosnatela(dados){
    document.querySelector('.cidade').innerHTML = "Tempo em " + dados.name;
    document.querySelector('.temp').innerHTML = Math.floor(dados.main.tempo)+"°C"
    document.querySelector('.texto-previsao').innerHTML = dados.wheater[0].description
    document.querySelector('.umidade').innerHTML = "Umidade: "+ dados.main.humidity + "%"
    document.querySelector('.img-previsao').src = "https://open.weathermap.org/img/wn/" + dados.wheater[0].icon+ ".png"
}
function cliquenobotao(){
    const cidade = document.querySelector('.input-cidade').value 
    buscarcidade(cidade)
}