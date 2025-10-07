var servidoresModel = require("../models/servidoresModel")

function addServidor(req, res){
    var nome = req.body.nomeServer;
    var empresa = req.body.empresaServer;
    var componentes = req.body.componentes;

    if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
    } else if (empresa == undefined) {
    res.status(400).send("Sua empresa está indefinida!");
    } else if (!Array.isArray(componentes) || componentes.length === 0) {
        res.status(400).send("Nenhum componente selecionado!");
    } else {

  servidoresModel.addServidor(nome, empresa, componentes)
    .then(
        (resultadoAdd) => {
            if(resultadoAdd.length > 0) {
                res.status(201).json(resultadoAdd);
                }
            }
        )
    }
}

module.exports = {
    addServidor
}