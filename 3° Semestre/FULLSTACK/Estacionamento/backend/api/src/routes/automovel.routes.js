const express = require("express");
const router = express.Router();

const {
    cadastrar,
    listar,
    buscarPorPlaca,
    atualizar,
    excluir
} = require("../controllers/automovel.controllers");

router.post("/cadastrar", cadastrar);
router.get("/listar", listar);
router.get("/buscar/:placa", buscarPorPlaca);
router.put("/atualizar/:id", atualizar);
router.delete("/excluir/:id", excluir);

module.exports = router;
