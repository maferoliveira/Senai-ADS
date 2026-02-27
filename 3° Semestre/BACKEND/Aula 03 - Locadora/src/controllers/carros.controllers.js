const prisma = require("../data/prisma");

async function vercarrosexistentes() {
    return await prisma.carros.findMany();
}

function validarcarros(carro, carrosexistentes){
    //placa
    carro.placa = carro.placa.trim().toUpperCase().replace(" ", "");
    if(carro.placa.length !== 7){
        return "Placa deve ter 7 caracteres";
    }
    if(carro.placa.includes(" ")){
        return "Placa não pode ter espaços em branco";
    }

    let duplicado = carrosexistentes.some(function(c){
        return c.placa.toUpperCase() === carro.placa;
    })
    if(duplicado){
        return "Placa já cadastrada";
    }

    //marca
    carro.marca = carro.marca.trim();

    if(carro.marca.length === 0){
        return "Marca não pode estar vazia";
    }

    let palavrasmarca = carro.marca.split(" ");
    let novamarca = palavrasmarca.map(function(palavra){
        return palavra[0].toUpperCase() + palavra.slice(1);
    })
    carro.marca = novamarca.join(" ");

    //modelo

    carro.modelo = carro.modelo.trim();

    if(carro.modelo.length === 0){
        return "Modelo não pode estar vazio";
    }

    let palavrasmodelo = carro.modelo.split(" ");

    let novomodelo = palavrasmodelo.map(function(palavra){
        return palavra[0].toUpperCase() + palavra.slice(1)
    })
    carro.modelo = novomodelo.join(" ");

    //ano

    carro.ano = carro.ano.trim();

    if(carro.ano.length !== 4){
        return "Ano deve ter apenas 4 caracteres";
    }
    let temletra = carro.ano.split("").some(function(c){
        return c >= "A" && c <= "Z" ||
        c >= "a" && c <= "z";
    });
    if(temletra){
        return "Ano não pode conter letras";
    }
    return "ok";
}
function validaratualizacaocarros(carro, carrosexistentes){
    //placa
    carro.placa = carro.placa.trim().toUpperCase().replace(" ", "");
    if(carro.placa.length !== 7){
        return "Placa deve ter 7 caracteres";
    }
    if(carro.placa.includes(" ")){
        return "Placa não pode ter espaços em branco";
    }

    //marca
    carro.marca = carro.marca.trim();

    if(carro.marca.length === 0){
        return "Marca não pode estar vazia";
    }

    let palavrasmarca = carro.marca.split(" ");
    let novamarca = palavrasmarca.map(function(palavra){
        return palavra[0].toUpperCase() + palavra.slice(1);
    })
    carro.marca = novamarca.join(" ");

    //modelo

    carro.modelo = carro.modelo.trim();

    if(carro.modelo.length === 0){
        return "Modelo não pode estar vazio";
    }

    let palavrasmodelo = carro.modelo.split(" ");

    let novomodelo = palavrasmodelo.map(function(palavra){
        return palavra[0].toUpperCase() + palavra.slice(1)
    })
    carro.modelo = novomodelo.join(" ");

    //ano

    carro.ano = carro.ano.trim();

    if(carro.ano.length !== 4){
        return "Ano deve ter apenas 4 caracteres";
    }
    let temletra = carro.ano.split("").some(function(c){
        return c >= "A" && c <= "Z" ||
        c >= "a" && c <= "z";
    });
    if(temletra){
        return "Ano não pode conter letras";
    }
    return "ok";
}

////////////////////////////////////////////////////////////////////////

const novocarro = async (req, res) =>{
    try{
        const carrosexistentes = await vercarrosexistentes();
        const resultado = validarcarros(req.body, carrosexistentes);

        if(resultado !== "ok"){
            return res.json({erro: resultado}).status(400).end();
        }

        const ncarro = await prisma.carros.create({
            data: req.body
        });
        res.json(ncarro).status(201).end();
    }catch(error){
        res.json({erro: error.message}).status(400).end();
    }
}
const listarcarros = async (req, res) =>{
    const carros = await prisma.carros.findMany();
    res.json(carros).status(201).end();
}
const apagarcarro = async (req, res) =>{
    const {id} = req.params;
    
    const carro = await prisma.carros.delete({
        where: {id: Number(id)}
    })
    res.json(carro).status(201).end()
}
const atualizarcarro = async (req, res) =>{
    try{
        const {id} = req.params;
        const carrosexistentes = await vercarrosexistentes();
        const resultado = validaratualizacaocarros(req.body, carrosexistentes);

        if(resultado !== "ok"){
            return res.json({erro:resultado}).status(400).end();
        }

        const carroatualizado = await prisma.carros.update({
            where: {id: Number(id)},
            data: req.body
        });
        res.status(200).json(carroatualizado).end();
    }catch(error){
        res.json({erro: error.message}).status(400).end();
    }
}

module.exports = {
    novocarro,
    listarcarros,
    apagarcarro,
    atualizarcarro
}