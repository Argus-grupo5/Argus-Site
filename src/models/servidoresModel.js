var database = require("../database/config")

function addServidor(nome, empresa, componentes) {

    var sqlInstruction = `INSERT INTO servidor (nome, fkempresa)
                            values ('${nome}', ${empresa})`


    return database.executar(sqlInstruction).then(resultado => {

        const servidorId = resultado.insertId;

        const promises = componentes.map(componente => {
            return database.executar(
                `INSERT INTO componente (fkServidor, tipo) VALUES ('${servidorId}', '${componente}')`
            );
        });

        return Promise.all(promises).then(() => ({ servidorId, componentes }));
        
    });
}

module.exports = {
    addServidor
}