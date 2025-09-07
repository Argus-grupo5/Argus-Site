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
function listarFuncionarios() {
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

function funcao_adicionar() {
    // Código para adicionar novo usuário 
}

function funcao_editar() {
    // Código para editar usuário 
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

module.exports = {
    autenticar,
    cadastrarEmpresa,
    cadastrarEndereco,
    listarFuncionarios,
    listarCargo,
    funcao_adicionar,
    funcao_editar,
    funcao_excluir,
    online
};