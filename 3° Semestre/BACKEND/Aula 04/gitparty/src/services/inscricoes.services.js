const { StatusInscricao } = require("@prisma/client");
const prisma = require("../data/prisma")

const limiteparticipantes = async (usuariosId, eventosId)=>{
    const evento = await prisma.eventos.findUnique({
        where: {id: eventosId},
        include: {
            inscricoes: true
        }
    });
    const numeroparticipantes = evento.inscricoes.filter(inscricoes => inscricoes.status == "CONFIRMADA").length;
    console.log(numeroparticipantes)
}

module.exports = {
    limiteparticipantes
}