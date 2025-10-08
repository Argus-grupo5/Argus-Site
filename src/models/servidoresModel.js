var database = require("../database/config")

function addServidor(nome, empresa, max) {

    var sqlInstruction = `INSERT INTO servidor (nome, fkempresa)
                            values ('${nome}', ${empresa})`


    return database.executar(sqlInstruction).then(resultado => {

        const servidorId = resultado.insertId;

        const promises = componentes.map(componente => {
            return database.executar(
                `INSERT INTO componente_maquina(fkservidor,fkcomponente,max, min) values ('${servidorId}', '${componenteId}', '${maxComponente}', '${minComponente}')`
            );
        });

        return Promise.all(promises).then(() => ({ servidorId, componentes }));
        
    });
}

module.exports = {
    addServidor
}