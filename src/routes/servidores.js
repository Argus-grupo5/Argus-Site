var express = require("express");
var router = express.Router();

var servidoresController = require("../controllers/servidoresController");

router.post("/addServidor", function(req, res) {
    servidoresController.addServidor(req, res);
})

router.get("/listar/:idServer", function(req, res){
    servidoresController.listar(req, res)
})

router.get("/listarServidores/:idServer/:siglaServer", function(req, res){
    servidoresController.listarServidores(req, res)
})

router.get("/listarServidoresTotais/:idServer", function(req, res){
    servidoresController.listarServidoresTotais(req, res)
})

router.get("/contarServidores/:idServer", function(req, res){
    servidoresController.contarServidores(req, res)
})

module.exports = router;