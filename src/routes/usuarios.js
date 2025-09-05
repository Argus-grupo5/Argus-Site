
var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})

router.post("/cadastrarEmpresa", upload.single('fotoServer'), function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/online", function (req, res) {
    usuarioController.online(req, res);
})

module.exports = router;