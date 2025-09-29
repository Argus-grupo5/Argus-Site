var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * from vw_user WHERE user_email = '${email}' AND user_senha = SHA2('${senha}', 512);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticarEmpresa(cnpj, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cnpj, senha)
    var instrucaoSql = `
        SELECT * FROM vw_empresa WHERE empresa_cnpj = '${cnpj}' AND empresa_senha = SHA2('${senha}', 512);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

function autenticarCodigo(id, email, codigo){
    var instrucaoSql = `
        SELECT * from vw_user where empresa_id = ${id} and empresa_email = '${email}' and empresa_codigo = ${codigo}
    `
    return database.executar(instrucaoSql)
}

function atualizarAcesso(id){
    var instrucaoSql = `
        UPDATE empresa SET primeiroAcesso = 0 where id = ${id}
    `
    return database.executar(instrucaoSql)
}

function cadastrarEndereco(cep, rua, bairro, cidade, estado, numero, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cep, rua, bairro, cidade, estado, numero, complemento);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO endereco (rua, cep, estado, cidade, bairro, numero, complemento)
        VALUE ('${rua}', ${cep}, '${estado}', '${cidade}', '${bairro}', ${numero}, '${complemento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(nome, telefone, senha, cnpj, razao, fkEndereco, foto, codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, telefone, senha, cnpj, razao, fkEndereco, foto, codigo);
    var instrucaoSql = `
        INSERT INTO empresa (nome_fantasia, telefone, senha, razao_social, cnpj, fkEndereco, foto_perfil, codigo) VALUES ('${nome}', '${telefone}', SHA2('${senha}', 512), '${razao}', '${cnpj}', ${fkEndereco}, '${foto}', ${codigo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarFuncionarios(idEmpresa) {
    const instrucaoSql = `
        SELECT 
            u.id, 
            u.foto_perfil, 
            u.nome, 
            u.sobrenome, 
            u.email, 
            c.id AS cargoId, 
            c.nome_cargo AS cargo, 
            DATE_FORMAT(u.data_cadastro, '%d/%m/%Y') as data_cadastro, 
            u.telefone,
            u.status_online
        FROM usuario u
        JOIN cargo c ON u.cargo_id = c.id
        WHERE u.fkempresa = ${idEmpresa}
        ORDER BY u.nome, u.sobrenome;
    `;
    return database.executar(instrucaoSql);
}

function listarCargo(idEmpresa) {
    const instrucaoSql = `
        SELECT c.id, c.nome_cargo as cargo, c.permissao_adicionar, c.permissao_editar, c.permissao_excluir
        FROM cargo c
        JOIN empresa_cargo ec ON c.id = ec.id_cargo
        WHERE ec.id_empresa = ${idEmpresa}
        ORDER BY c.id;
    `;
    return database.executar(instrucaoSql);
}

function funcao_adicionar(funcionario_nome, funcionario_sobrenome, funcionario_cargo, funcionario_email, funcionario_senha, funcionario_telefone, funcionario_empresa) {
    console.log("ACESSEI O USUARIO MODEL");

    const instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, telefone, fkempresa, cargo_id)
        VALUES ('${funcionario_nome}', '${funcionario_sobrenome}', '${funcionario_email}', 
                SHA2('${funcionario_senha}', 512), '${funcionario_telefone}', 
                ${funcionario_empresa}, ${funcionario_cargo});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarSenhaAntiga(id, senhaAntiga) {
    const instrucaoSql = `
        SELECT id FROM usuario 
        WHERE id = ${id} AND senha = SHA2('${senhaAntiga}', 512);
    `;
    return database.executar(instrucaoSql);
}

function funcao_editar(funcionario_nome, funcionario_sobrenome, funcionario_senha, funcionario_telefone, id, foto) {
    console.log("=== DEBUG funcao_editar MODEL ===");
    console.log("Foto recebida no model:", foto);
    
    let updateSql = `
        UPDATE usuario 
        SET nome = '${funcionario_nome}', 
            sobrenome = '${funcionario_sobrenome}'
    `;
    
    if (funcionario_telefone && funcionario_telefone !== "") {
        updateSql += `, telefone = '${funcionario_telefone}'`;
    }
    
    if (funcionario_senha && funcionario_senha !== "") {
        updateSql += `, senha = SHA2('${funcionario_senha}', 512)`;
    }
    
    if (foto && foto !== "") {
        updateSql += `, foto_perfil = '${foto}'`;
        console.log("Adicionando foto na query:", foto);
    }
    
    updateSql += ` WHERE id = ${id};`;
    
    console.log("Query SQL completa:", updateSql);
    console.log("=================================");
    
    return database.executar(updateSql);
}

function funcao_editar_funcionario(funcionario_cargo, funcionario_email, funcionario_telefone, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function funcao_editar_funcionario():", funcionario_cargo, funcionario_email, funcionario_telefone, id);

    const instrucaoSql = `
        UPDATE usuario 
        SET email = '${funcionario_email}',
            telefone = '${funcionario_telefone}',
            cargo_id = ${funcionario_cargo}
        WHERE id = ${id};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function funcao_editar_proprio(funcionario_nome, funcionario_sobrenome, funcionario_senha, funcionario_email, funcionario_telefone, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function funcao_editar():", funcionario_nome, funcionario_sobrenome, funcionario_email, funcionario_telefone, id);
    var instrucaoSql = `
        update usuario set nome = '${funcionario_nome}', sobrenome = '${funcionario_sobrenome}', senha = SHA2('${funcionario_senha}', 512), email = '${funcionario_email}',
        telefone = ${funcionario_telefone}, foto_perfil = 'padrao.svg' where id = ${id};
    `;

    return database.executar(instrucaoSql);
}

function funcao_excluir(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function funcao_excluir():", id);
    var instrucaoSql = `DELETE FROM usuario WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function online(idUsuario, status) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function online():", status, idUsuario);

    var instrucaoSql = `
        UPDATE usuario
        SET status_online = ${status}
        WHERE id = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarCargo(idCargo) {
    const instrucaoSql = `
        SELECT nome_cargo FROM cargo WHERE id = ${idCargo};
    `;
    return database.executar(instrucaoSql)
        .then(resultado => resultado[0]);
}

function editar_empresa_root(nomeFantasia, telefone, senha, senhaAntiga, empresaId, foto) {
    console.log("ACESSEI O USUARIO MODEL - editar_empresa_root");
    
    // Primeiro verificar se a senha antiga está correta
    const verificarSenhaSql = `
        SELECT id FROM empresa 
        WHERE id = ${empresaId} AND senha = SHA2('${senhaAntiga}', 512);
    `;
    
    return database.executar(verificarSenhaSql)
        .then(resultado => {
            if (resultado.length === 0) {
                throw new Error("Senha antiga incorreta");
            }
            
            // Se senha correta, fazer o update
            let updateSql = `
                UPDATE empresa 
                SET nome_fantasia = '${nomeFantasia}',
                    telefone = '${telefone}'
            `;
            
            if (senha && senha !== "") {
                updateSql += `, senha = SHA2('${senha}', 512)`;
            }
            
            if (foto && foto !== "") {
                updateSql += `, foto_perfil = '${foto}'`;
            }
            
            updateSql += ` WHERE id = ${empresaId};`;
            
            console.log("Executando a instrução SQL: \n" + updateSql);
            return database.executar(updateSql);
        });
}

function buscar_cargo(userId) {
    console.log("Buscando cargo direto pela VIEW para userId:", userId);
    
    var instrucaoSql = `
        SELECT cargo_cargo 
        FROM vw_user 
        WHERE user_id = ${userId};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    autenticarEmpresa,
    autenticarCodigo,
    atualizarAcesso,
    cadastrarEmpresa,
    cadastrarEndereco,
    listarFuncionarios,
    listarCargo,
    funcao_adicionar,
    funcao_editar,
    funcao_editar_proprio,
    funcao_excluir,
    online,
    buscar_cargo,
    verificarCargo,
    editar_empresa_root,
    verificarSenhaAntiga,
    funcao_editar_funcionario
    
};