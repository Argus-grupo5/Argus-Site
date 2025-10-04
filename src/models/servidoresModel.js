var database = require("../database/config")

function addServidor(nome, empresa){
    var sqlInstruction = `INSERT INTO SERVIDOR (nome, fkempresa) values ('${nome}', ${empresa})`
    return database.executar(sqlInstruction);

}

module.exports = {
    addServidor
}