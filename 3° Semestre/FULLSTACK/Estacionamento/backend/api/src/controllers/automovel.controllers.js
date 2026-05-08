const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {

    try {

        const item = await prisma.automovel.create({
            data: req.body
        });

        res.status(201).json(item);

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });
    }
};

const listar = async (req, res) => {

    try {

        const lista = await prisma.automovel.findMany({
            include: {
                estadias: true
            }
        });

        res.status(200).json(lista);

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });
    }
};

const buscarPorPlaca = async (req, res) => {

    const { placa } = req.params;

    try {

        const item = await prisma.automovel.findUnique({
            where: {
                placa: placa
            },
            include: {
                estadias: true
            }
        });

        res.status(200).json(item);

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });
    }
};

const atualizar = async (req, res) => {

    const { placa } = req.params;

    try {

        const item = await prisma.automovel.update({
            where: {
                placa: placa
            },
            data: req.body
        });

        res.status(200).json(item);

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });
    }
};

const excluir = async (req, res) => {

    const { placa } = req.params;

    try {

        await prisma.automovel.delete({
            where: {
                placa: placa
            }
        });

        res.status(200).json({
            msg: "Excluído com sucesso"
        });

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscarPorPlaca,
    atualizar,
    excluir
};