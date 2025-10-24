var database = require("../database/config")

function addServidor(nome, empresa, nome_estado, sigla_estado, maxCpu, minCpu, maxRam, minRam, maxDisco, minDisco, maxRede, minRede, maxGpu, minGpu) {
    var sqlInstruction = `INSERT INTO servidor (nome, nome_estado, sigla_estado, fkempresa)
                            VALUES ('${nome}','${nome_estado}','${sigla_estado}', '${empresa}')`;

    return database.executar(sqlInstruction).then(resultado => {
        const servidorId = resultado.insertId;

        const componentes = [
            { id: 1, max: maxCpu, min: minCpu },
            { id: 2, max: maxRam, min: minRam },
            { id: 3, max: maxDisco, min: minDisco },
            { id: 4, max: maxRede, min: minRede },
            { id: 5, max: maxGpu, min: minGpu}
        ];

        const promises = componentes.map(comp => {
            return database.executar(
                `INSERT INTO parametros (fkservidor, fkcomponente, maximo, minimo) VALUES ('${servidorId}', '${comp.id}', '${comp.max}', '${comp.min}')`
            );
        });

        return Promise.all(promises).then(() => ({ servidorId }));
    });
}


function listar(id) {
    var sqlInstruction = `SELECT DISTINCT nome_estado, sigla_estado, COUNT(nome_estado) AS total_servidores FROM servidor WHERE 
    fkempresa = ${id} AND nome_estado IS NOT NULL
    GROUP BY nome_estado,sigla_estado;	`

    return database.executar(sqlInstruction);
}

function listarServidores(id, siglaEstado){
    var sqlInstruction = `SELECT id, nome, nome_estado FROM servidor 
        WHERE fkempresa = ${id} AND sigla_estado = '${siglaEstado}'
        ORDER BY nome;`
    
    return database.executar(sqlInstruction)
}

function listarServidoresTotais(id) {
    var sqlInstruction = `SELECT * FROM servidor WHERE fkempresa = ${id};`

    return database.executar(sqlInstruction);
}

function contarServidores(id){
    var sqlInstruction = `SELECT count(id) AS totalServers FROM servidor WHERE fkempresa = ${id};`

    return database.executar(sqlInstruction);
}

module.exports = {
    addServidor,
    listar,
    listarServidores,
    listarServidoresTotais,
    contarServidores
}