var database = require("../database/config")

function addServidor(nome, empresa, nome_estado, sigla_estado, maxCpu, minCpu, maxRam, minRam, maxDisco, minDisco, maxRede, minRede) {
    var sqlInstruction = `INSERT INTO servidor (nome, nome_estado, sigla_estado, fkempresa)
                            VALUES ('${nome}','${nome_estado}','${sigla_estado}', '${empresa}')`;

    return database.executar(sqlInstruction).then(resultado => {
        const servidorId = resultado.insertId;

        const componentes = [
            { id: 1, max: maxCpu, min: minCpu },
            { id: 2, max: maxRam, min: minRam },
            { id: 3, max: maxDisco, min: minDisco },
            { id: 4, max: maxRede, min: minRede }
        ];

        const promises = componentes.map(comp => {
            return database.executar(
                `INSERT INTO componente_maquina (fkservidor, fkcomponente, maximo, minimo) VALUES ('${servidorId}', '${comp.id}', '${comp.max}', '${comp.min}')`
            );
        });

        return Promise.all(promises).then(() => ({ servidorId }));
    });
}

module.exports = {
    addServidor
}