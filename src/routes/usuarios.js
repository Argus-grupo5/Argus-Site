
var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.post("/editar", function (req, res) {
    usuarioController.editar(req, res);
});

router.get("/filtrar", (req, res) => {
    usuarioController.filtrar(req, res);
});

router.post("/criarUsuario", (req, res) => {
    usuarioController.criarUsuario(req, res);
});

router.get("/listarCargo", usuarioController.listarCargo);

router.put("/online", function (req, res) {
    usuarioController.online(req, res);
})

module.exports = router;