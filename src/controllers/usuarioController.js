var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            user_id: resultadoAutenticar[0].user_id,
                            user_name: resultadoAutenticar[0].user_name,
                            user_sobrenome: resultadoAutenticar[0].user_sobrenome,
                            user_email: resultadoAutenticar[0].user_email,
                            user_telefone: resultadoAutenticar[0].user_telefone,
                            user_foto: resultadoAutenticar[0].user_foto,
                            user_data: resultadoAutenticar[0].user_data,

                            empresa_id: resultadoAutenticar[0].empresa_id,
                            empresa_nome_fantasia: resultadoAutenticar[0].empresa_nome_fantasia,
                            empresa_razao_social: resultadoAutenticar[0].empresa_razao_social,
                            empresa_cnpj: resultadoAutenticar[0].empresa_cnpj,
                            empresa_email: resultadoAutenticar[0].empresa_email,
                            empresa_telefone: resultadoAutenticar[0].empresa_telefone,
                            empresa_data: resultadoAutenticar[0].empresa_data,

                            endereco_rua: resultadoAutenticar[0].endereco_rua,
                            endereco_numero: resultadoAutenticar[0].endereco_numero,
                            endereco_bairro: resultadoAutenticar[0].endereco_bairro,
                            endereco_cidade: resultadoAutenticar[0].endereco_cidade,
                            endereco_estado: resultadoAutenticar[0].endereco_estado,
                            endereco_cep: resultadoAutenticar[0].endereco_cep,
                            endereco_complemento: resultadoAutenticar[0].endereco_complemento,

                            cargo_id: resultadoAutenticar[0].cargo_id,
                            cargo_cargo: resultadoAutenticar[0].cargo_cargo,
                            cargo_funcao: resultadoAutenticar[0].cargo_funcao
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function editar(req, res){
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }else {
        usuarioModel.editar(email, senha)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
    
    
}

function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cep = req.body.cepServer;
    var rua = req.body.ruaServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var id;
    // Faça as validações dos valores
    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (rua == undefined) {
        res.status(400).send("Sua rua está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    } else {

        usuarioModel.cadastrarEndereco(cep, rua, bairro, cidade, estado, numero, complemento)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEmpresa(req, res) {
    var nome = req.body.nomeServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var razao = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var id = req.body.idServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("O cnpj está undefined!");
    } else if (razao == undefined) {
        res.status(400).send("A razao está undefined!");
    } else if (id == undefined) {
        res.status(400).send("O id está undefined!");
    }

    usuarioModel.cadastrarEmpresa(nome, telefone, email, senha, cnpj, razao, id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function online(req, res) {
    var status = req.body.status;
    var idUsuario = req.body.idServer;
    if (status == undefined) {
        res.status(400).send("Seus status estão undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        usuarioModel.online(idUsuario, status)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastroPreferencias! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



//tela de funcionários
function filtrar(req, res) {
    usuarioModel.filtrar()
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum funcionário encontrado");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar funcionários:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function listarCargo(req, res) {
    usuarioModel.listarCargo()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    autenticar,
    editar,
    cadastrarEndereco,
    cadastrarEmpresa,
    online,
    cadastrarEmpresa,
    filtrar,
    listarCargo
}