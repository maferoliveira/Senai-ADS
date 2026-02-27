const express = require("express");
const router = express.Router();

const clientescontroller = require("../controllers/clientes.controllers");

router.post("/cadastrarcliente", clientescontroller.novocliente);
router.get("/listarclientes", clientescontroller.listarclientes);
router.delete("/deletarcliente/:id", clientescontroller.apagarcliente);
router.put("/atualizarcliente/:id", clientescontroller.atualizarcliente);

module.exports = router;
