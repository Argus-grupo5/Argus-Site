var express = require("express");
var router = express.Router();

var servidoresController = require("../controllers/servidoresController");

router.post("/addServidor", function(req, res) {
    servidoresController.addServidor(req, res);
})

module.exports = router;