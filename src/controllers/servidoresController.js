var servidoresModel = require("../models/servidoresModel")

function addServidor(req, res){
    var nome = req.body.nomeServer;
    var empresa = req.body.empresaServer;
    var nome_estado = req.body.nomeEstadoServer;
    var sigla_estado = req.body.siglaEstadoServer;
    var maxCpu = req.body.maxCpuServer;
    var minCpu = req.body.minCpuServer;
    var maxRam = req.body.maxRamServer;
    var minRam = req.body.minRamServer;
    var maxDisco = req.body.maxDiscoServer;
    var minDisco = req.body.minDiscoServer;
    var maxRede = req.body.maxRedeServer;
    var minRede = req.body.minRedeServer;

    if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
    } else if (empresa == undefined) {
    res.status(400).send("Sua empresa está indefinida!");
    } else if (nome_estado == undefined) {
    res.status(400).send("Seu estado está indefinido.")
    } else if (sigla_estado == undefined) {
    res.status(400).send("Sua sigla está indefinida.")
    } else if (maxCpu == undefined) {
    res.status(400).send("Seu máximo de CPU está indefinido!");
    } else if (minCpu == undefined) {
    res.status(400).send("Seu mínimo de CPU está indefinido");
    } else if (maxRam == undefined) {
    res.status(400).send("Seu máximo de RAM está indefinido");
    } else if (minRam == undefined) {
    res.status(400).send("Seu máximo de RAM está indefinido");
    } else if (maxDisco == undefined) {
    res.status(400).send("Seu máximo de DISCO está indefinido");
    } else if (minDisco == undefined) {
    res.status(400).send("Seu máximo de DISCO está indefinido");
    } else if (maxRede == undefined) {
    res.status(400).send("Seu máximo de REDE está indefinido");
    } else if (minRede == undefined) {
    res.status(400).send("Seu máximo de REDE está indefinido");
    } 
    else {

  servidoresModel.addServidor(nome, empresa, nome_estado, sigla_estado, maxCpu, minCpu, maxRam, minRam, maxDisco, minDisco, maxRede, minRede)
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