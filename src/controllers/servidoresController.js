var servidoresModel = require("../models/servidoresModel")

function addServidor(req, res){
    var nome = req.body.nomeServer;
    var empresa = req.body.empresaServer;

    if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (empresa == undefined) {
    res.status(400).send("Sua empresa está indefinida!");
  }

  servidoresModel.addServidor(nome, empresa)
    .then(
        (resultadoAdd) => {
            if(resultadoAdd.length > 0) {
                res.status(201).json(resultadoAdd);
            }
        }
    )
}

module.exports = {
    addServidor
}