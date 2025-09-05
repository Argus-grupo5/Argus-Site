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
function editar(email, senha){
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = SHA2('${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
function cadastrarEmpresa(nome, telefone, email, senha, cnpj, razao, fkEndereco) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, telefone, email, senha, cnpj, razao, fkEndereco);
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresa (nome_fantasia, telefone, email, senha, razao_social, cnpj,  fkEndereco) VALUES ('${nome}', '${telefone}', '${email}', SHA2('${senha}', 512), '${razao}', ${cnpj}, ${fkEndereco});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//tela de funcionários
function filtrar() {
    const instrucaoSql = `
        select u.id, u.foto_perfil, u.nome, u.sobrenome, u.email, c.cargo, DATE_FORMAT(u.data_cadastro, '%d/%m/%Y') as data_cadastro, u.telefone 
        from cargo c
        join cargousuario uc on c.id = uc.Cargo_id
        join usuario u on uc.usuario_id = u.id;
    `;
    return database.executar(instrucaoSql);
}
function listarCargo() {
    const instrucaoSql = "select cargo from cargo order by cargo";
    return database.executar(instrucaoSql);
}

function funcao_excluir(id) {
    const instrucaoSql = `delete from cargoUsuario where usuario_id = ${id}`;
    return database.executar(instrucaoSql);
}

function online(idUsuario, status) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", status, idUsuario);

    var instrucaoSql = `
        UPDATE usuario
        SET status_online = ${status}
        WHERE id = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//tela de funcionários
function filtrar() {
    const instrucaoSql = `
        select u.foto_perfil, u.nome, u.sobrenome, u.email, c.cargo, DATE_FORMAT(u.data_cadastro, '%d/%m/%Y') as data_cadastro, u.telefone 
        from cargo c
        join cargousuario uc on c.id = uc.Cargo_id
        join usuario u on uc.usuario_id = u.id;
    `;
    return database.executar(instrucaoSql);
}
function listarCargo() {
    const instrucaoSql = "SELECT cargo FROM cargo ORDER BY cargo";
    return database.executar(instrucaoSql);
}

// function criarUsuario(nome, sobrenome, cargo, email, senha, telefone, idEmpresa) {
//     const instrucaoSql = `INSERT INTO usuario (nome, sobrenome, email, senha, telefone, fkempresa)
//     VALUES ('${nome}', '${sobrenome}', '${email}', SHA2('${senha}', 512), '${telefone}', ${idEmpresa})`;
//     const instrucaoSql2 = `INSERT INTO cargousuario (Cargo_id, usuario_id)
//     VALUES (${cargo}, (SELECT id FROM usuario where email = '${email}'));`;
//     return database.executar(instrucaoSql, instrucaoSql2);
// }

async function criarUsuario(nome, sobrenome, cargo, email, senha, telefone, idEmpresa) {
    const insertUsuarioSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, telefone, fkempresa)
        VALUES ('${nome}', '${sobrenome}', '${email}', SHA2('${senha}', 512), '${telefone}', ${idEmpresa});
    `;
    const result = await database.executar(insertUsuarioSql);

    const selectIdSql = `SELECT id FROM usuario WHERE email = '${email}' LIMIT 1;`;
    const usuarioRows = await database.executar(selectIdSql);
    const usuarioId = usuarioRows[0].id;

    const insertCargoSql = `
        INSERT INTO cargousuario (Cargo_id, usuario_id)
        VALUES (${cargo}, ${usuarioId});
    `;
    return database.executar(insertCargoSql);
}

module.exports = {
    autenticar,
    editar,
    cadastrarEmpresa,
    cadastrarEndereco,
    filtrar,
    listarCargo,
    criarUsuario,
    funcao_excluir,
    online
};