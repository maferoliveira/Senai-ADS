const prisma = require("../data/prisma");

async function verclientesexistentes() {
    return await prisma.clientes.findMany();
}

function validarcliente(cliente, clientesexistentes){

    // nome
    cliente.nome = cliente.nome.trim().toUpperCase();

    if(cliente.nome.length === 0){
        return "Nome é obrigatório";
    }

    let nomepartes = cliente.nome.split(" ");

    if(nomepartes.length < 2){
        return "Nome deve conter ao mínimo 2 palavras";
    }

    // cpf
    cliente.cpf = cliente.cpf.replace("-", "").replace(".", "").replace(".", "");

    if(cliente.cpf.length !== 11){
        return "CPF deve conter 11 caracteres";
    }

    // email
    cliente.email = cliente.email.toLowerCase();

    if(!cliente.email.includes("@") || !cliente.email.includes(".")){
        return "Email inválido";
    }

    let emailexistente = clientesexistentes.some(c =>
        c.email === cliente.email
    );

    if(emailexistente){
        return "Email já cadastrado";
    }

    // cnh
    let caracterescnh = cliente.cnh.split("");
    let primeirocaractere = caracterescnh[0];

    if(!(primeirocaractere >= "0" && primeirocaractere <= "9")){
        return "CNH deve começar com número";
    }

    return "ok";
}
function validaratualizacaocliente(cliente, clientesexistentes){

    // nome
    cliente.nome = cliente.nome.trim().toUpperCase();

    if(cliente.nome.length === 0){
        return "Nome é obrigatório";
    }

    let nomepartes = cliente.nome.split(" ");

    if(nomepartes.length < 2){
        return "Nome deve conter ao mínimo 2 palavras";
    }

    // cpf
    cliente.cpf = cliente.cpf.replace("-", "").replace(".", "").replace(".", "");

    if(cliente.cpf.length !== 11){
        return "CPF deve conter 11 caracteres";
    }

    // email
    cliente.email = cliente.email.toLowerCase();

    if(!cliente.email.includes("@") || !cliente.email.includes(".")){
        return "Email inválido";
    }

    // cnh
    let caracterescnh = cliente.cnh.split("");
    let primeirocaractere = caracterescnh[0];

    if(!(primeirocaractere >= "0" && primeirocaractere <= "9")){
        return "CNH deve começar com número";
    }

    return "ok";
}

////////////////////////////////////////////////////////////////////////

const novocliente = async (req, res) =>{
    try{
        const clientesexistentes = await verclientesexistentes();
        const resultado = validarcliente(req.body, clientesexistentes);

        if(resultado !== "ok"){
            return res.status(400).json({erro: resultado});
        }

        const ncliente = await prisma.clientes.create({
            data: req.body
        });

        return res.status(200).json(ncliente);

    }catch(error){
        return res.status(400).json({erro: error.message});
    }
}

const listarclientes = async (req, res) =>{
    const clientes = await prisma.clientes.findMany();
    return res.status(200).json(clientes);
}

const apagarcliente = async (req, res) =>{
    const {id} = req.params;

    const cliente = await prisma.clientes.delete({
        where: {id: Number(id)}
    });

    return res.status(200).json(cliente);
}

const atualizarcliente = async (req, res) =>{
    try{
        const {id} = req.params;

        const clientesexistentes = await verclientesexistentes();
        const resultado = validaratualizacaocliente(req.body, clientesexistentes);

        if(resultado !== "ok"){
            return res.status(400).json({erro: resultado});
        }

        const clienteatualizado = await prisma.clientes.update({
            where: {id: Number(id)},
            data: req.body
        });

        return res.status(200).json(clienteatualizado);

    }catch(error){
        return res.status(400).json({erro: error.message});
    }
}

module.exports = {
    novocliente,
    listarclientes,
    apagarcliente,
    atualizarcliente
};