
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

<<<<<<<<< Temporary merge branch 1
router.put("/online", function (req, res) {
    usuarioController.online(req, res);
})
=========

router.get("/filtrar", function (req, res){
    usuarioController.filtrar(req, res);
});

router.post("/criarUsuario", (req, res) => {
    usuarioController.criarUsuario(req, res);
});

router.get("/listarCargo", usuarioController.listarCargo);
>>>>>>>>> Temporary merge branch 2

module.exports = router;