const express = require("express");
const router = express.Router();

const carroscontroller = require("../controllers/carros.controllers");

router.post("/cadastrarcarro", carroscontroller.novocarro);
router.get("/listarcarros", carroscontroller.listarcarros);
router.delete("/deletarcarro/:id", carroscontroller.apagarcarro);
router.put("/atualizarcarro/:id", carroscontroller.atualizarcarro);

module.exports = router;
