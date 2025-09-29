const { cadastrarFuncionario } = require("../controllers/usuarioController");
var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * from vw_user WHERE user_email = '${email}' AND user_senha = SHA2('${senha}', 512);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

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

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarEmpresa(nome, telefone, email, senha, cnpj, razao, fkEndereco, codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, telefone, email, senha, cnpj, razao, fkEndereco, codigo);
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresa (nome_fantasia, telefone, email, senha, razao_social, cnpj,  fkEndereco, codigo) VALUES ('${nome}', '${telefone}', '${email}', SHA2('${senha}', 512), '${razao}', ${cnpj}, ${fkEndereco}, ${codigo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//tela de funcionários
function listarFuncionarios() {
    const instrucaoSql = `
        select u.id, u.foto_perfil, u.nome, u.sobrenome, u.email, c.id AS cargoId, c.cargo, DATE_FORMAT(u.data_cadastro, '%d/%m/%Y') as data_cadastro, u.telefone 
        from cargo c
        join cargousuario uc on c.id = uc.Cargo_id
        join usuario u on uc.usuario_id = u.id;
    `;
    return database.executar(instrucaoSql);
}

function listarCargo() {
    const instrucaoSql = "select id, cargo from cargo order by id";
    return database.executar(instrucaoSql);
}

async function funcao_adicionar(funcionario_nome, funcionario_sobrenome, funcionario_cargo, funcionario_email, funcionario_senha, funcionario_telefone, funcionario_empresa) {
    console.log("ACESSEI O USUARIO MODEL");

    const insertUsuario = `
        INSERT INTO usuario (nome, sobrenome, email, senha, telefone, fkempresa)
        VALUES ('${funcionario_nome}', '${funcionario_sobrenome}', '${funcionario_email}', SHA2('${funcionario_senha}', 512), '${funcionario_telefone}', ${funcionario_empresa});
    `;
    const resultado = await database.executar(insertUsuario);
    const usuarioId = resultado.insertId;
    const insertCargo = `
        INSERT INTO cargousuario (usuario_id, Cargo_id)
        VALUES (${usuarioId}, ${funcionario_cargo});
    `;

    return database.executar(insertCargo);
}


function funcao_editar(funcionario_nome, funcionario_sobrenome, funcionario_senha, funcionario_cargo, funcionario_email, funcionario_telefone, id) {
    const EditarDadosFuncionario_TabelaUsuario = `
        update usuario set nome = '${funcionario_nome}', sobrenome = '${funcionario_sobrenome}', email = '${funcionario_email}',
        telefone = ${funcionario_telefone}, senha = SHA2('${funcionario_senha}', 512), foto_perfil = 'padrao.svg' where id = ${id};
    `;
    const EditarDadosFuncionario_TabelaCargoUsuario = `
        update cargousuario set Cargo_id = ${funcionario_cargo} where usuario_id = ${id};
    `;

    return database.executar(EditarDadosFuncionario_TabelaUsuario, EditarDadosFuncionario_TabelaCargoUsuario);
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
    var instrucaoSql = `delete from cargoUsuario where usuario_id = ${id}`;
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

module.exports = {
    autenticar,
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
    online
};