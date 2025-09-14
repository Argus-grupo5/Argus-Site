var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); 

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})

router.post("/cadastrarEmpresa", upload.single('fotoServer'), function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/autenticarEmpresa", function (req, res) {
    usuarioController.autenticarEmpresa(req, res);
});

router.get("/listarFuncionarios", function (req, res) {
    usuarioController.listarFuncionarios(req, res);
});

router.post("/criarUsuario", (req, res) => {
    usuarioController.criarUsuario(req, res);
});

router.get("/listarCargo", function (req, res) {
    usuarioController.listarCargo(req, res);
});

router.post("/funcao_adicionar", function (req, res) {
    usuarioController.funcao_adicionar(req, res)
})

router.put("/funcao_editar", upload.single('foto'), function (req, res) {
    usuarioController.funcao_editar(req, res);
});

router.put("/funcao_editar_funcionario", function (req, res) {
    usuarioController.funcao_editar_funcionario(req, res)
})

router.put("/funcao_editar_proprio", function (req, res) {
    usuarioController.funcao_editar_proprio(req, res)
})

router.delete("/funcao_excluir", function (req, res) {
    usuarioController.funcao_excluir(req, res)
})

router.put("/online", function (req, res) {
    usuarioController.online(req, res);
})

// Altere a rota para usar o middleware de upload
router.put("/editar_empresa_root", upload.single('foto'), function (req, res) {
    usuarioController.editar_empresa_root(req, res);
});

router.get("/cargoUsuario/:id", function (req, res) {
    usuarioController.buscar_cargo(req, res);
});

module.exports = router;