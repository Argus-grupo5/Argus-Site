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
function editar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
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

function funcao_adicionar(req, res){
    var funcionario_nome = req.body.nomeServer;
    var funcionario_sobrenome = req.body.sobrenomeServer;
    var funcionario_cargo = req.body.cargoServer;
    var funcionario_email = req.body.emailServer;
    var funcionario_senha = req.body.senhaServer;
    var funcionario_telefone = req.body.telefoneServer;
    var funcionario_empresa = req.body.idEmpresaServer;

    if (funcionario_nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (funcionario_sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (funcionario_cargo == undefined) {
    res.status(400).send("Seu email está undefined!");
    } else if (funcionario_email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (funcionario_senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (funcionario_telefone == undefined) {
        res.status(400).send("O telefone está undefined!");
    } else if (funcionario_empresa == undefined) {
        res.status(400).send("O id está undefined!");
    }

    usuarioModel.funcao_adicionar(funcionario_nome, funcionario_sobrenome, funcionario_cargo, funcionario_email, funcionario_senha, funcionario_telefone, funcionario_empresa)
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

function funcao_editar(idVar) {
    var nomeVar = document.getElementById("ipt_nome").value.trim();
    var sobrenomeVar = document.getElementById("ipt_sobrenome").value.trim();
    var cargoVar = document.getElementById("ipt_cargo").value;
    var emailVar = document.getElementById("ipt_email").value.trim();
    var telefoneVar = document.getElementById("ipt_telefone").value.replace(/\D/g, "");

    console.log("Dados para edição:", { 
        nome: nomeVar, 
        sobrenome: sobrenomeVar, 
        cargo: cargoVar, 
        email: emailVar, 
        telefone: telefoneVar 
    });

    if (nomeVar === "") {
        marcarErro(document.getElementById("ipt_nome"), "O campo nome está em branco.");
        return;
    }
    if (sobrenomeVar === "") {
        marcarErro(document.getElementById("ipt_sobrenome"), "O campo sobrenome está em branco.");
        return;
    }
    if (cargoVar === "") {
        marcarErro(document.getElementById("ipt_cargo"), "Selecione um cargo.");
        return;
    }
    if (emailVar === "") {
        marcarErro(document.getElementById("ipt_email"), "O campo email está em branco.");
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVar)) {
        marcarErro(document.getElementById("ipt_email"), "Digite um e-mail válido");
        return;
    }
    if (telefoneVar && !/^\d{10,11}$/.test(telefoneVar)) {
        marcarErro(document.getElementById("ipt_telefone"), "Telefone deve ter 10 ou 11 números (com DDD)");
        return;
    }

    fetch(`/usuarios/editar/${idVar}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            sobrenomeServer: sobrenomeVar,
            cargoServer: cargoVar,
            emailServer: emailVar,
            telefoneServer: telefoneVar
        }),
    })
    .then(resposta => {
        console.log("Status da resposta:", resposta.status);
        if (resposta.ok) {
            return resposta.json();
        } else {
            return resposta.text().then(text => { throw new Error(text) });
        }
    })
    .then(dados => {
        mostrarErro("Usuário atualizado com sucesso!");
        setTimeout(() => {
            fechar_popup();
            window.location.reload();
        }, 2000);
    })
    .catch(erro => {
        console.error(`Erro completo:`, erro);
        mostrarErro("Erro ao editar usuário: " + erro.message);
    });
}

function funcao_excluir(req, res) {
    var id = req.body.idServer;
    if (id == undefined) {
        return res.status(400).send("O id está undefined!");
    }
    
    usuarioModel.funcao_excluir(id)
        .then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json({ message: "Funcionário excluído com sucesso" });
            } else {
                res.status(404).send("Funcionário não encontrado");
            }
        })
        .catch((erro) => {
            console.error("Erro ao excluir funcionário:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
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

function buscarPorId(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).send("O id está undefined!");
    } else {
        usuarioModel.buscarPorId(id)
            .then((resultado) => {
                if (resultado.length > 0) {
                    res.status(200).json(resultado[0]);
                } else {
                    res.status(404).send("Usuário não encontrado");
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar usuário:", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

function editar(req, res) {
    var id = req.params.id;
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;

    console.log("Dados recebidos para edição:", { id, nome, sobrenome, cargo, email, telefone });

    if (id == undefined) {
        res.status(400).send("O id está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("O email está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("O cargo está undefined!");
    } else {

        usuarioModel.editar(id, nome, sobrenome, email, telefone)
            .then(() => {

                return usuarioModel.editarCargo(id, cargo);
            })
            .then(() => {
                res.status(200).json({ message: "Usuário atualizado com sucesso" });
            })
            .catch((erro) => {
                console.error("Erro ao editar usuário:", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}


function editarPerfil(req, res) {
    const id = req.body.idServer;
    const nome = req.body.nomeServer;
    const sobrenome = req.body.sobrenomeServer;
    const email = req.body.emailServer;
    const telefone = req.body.telefoneServer;
    const novaSenha = req.body.novaSenhaServer;
    const senhaAtual = req.body.senhaAtualServer;

    console.log("Dados recebidos para edição de perfil:", {
        id, nome, sobrenome, email, telefone, temNovaSenha: !!novaSenha
    });

    if (!id) return res.status(400).json({ error: "ID é obrigatório" });
    if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });
    if (!sobrenome) return res.status(400).json({ error: "Sobrenome é obrigatório" });
    if (!email) return res.status(400).json({ error: "Email é obrigatório" });
    if (!telefone) return res.status(400).json({ error: "Telefone é obrigatório" });
    if (!senhaAtual) return res.status(400).json({ error: "Senha atual é obrigatória" });

    usuarioModel.verificarSenha(id, senhaAtual)
        .then(senhaCorreta => {
            if (!senhaCorreta) {
                return res.status(401).json({ error: "Senha atual incorreta" });
            }

            return usuarioModel.editarPerfil(id, nome, sobrenome, email, telefone, novaSenha)
                .then(() => {
                    res.json({ message: "Perfil atualizado com sucesso" });
                });
        })
        .catch(error => {
            console.error("Erro ao editar perfil:", error);
            res.status(500).json({ error: error.message });
        });
}

function verificarSenha(req, res) {
    const id = req.body.idServer;
    const senha = req.body.senhaServer;

    if (!id || !senha) {
        return res.status(400).json({ error: "ID e senha são obrigatórios" });
    }

    usuarioModel.verificarSenha(id, senha)
        .then(senhaCorreta => {
            res.json({ senhaCorreta });
        })
        .catch(error => {
            console.error("Erro ao verificar senha:", error);
            res.status(500).json({ error: error.message });
        });
}

module.exports = {
    autenticar,
    cadastrarEndereco,
    cadastrarEmpresa,
    filtrar,
    listarCargo,
    funcao_adicionar,
    funcao_editar,
    funcao_excluir,
    online,
    buscarPorId,
    editar,
    editarPerfil, // ← Adicione esta linha
    verificarSenha // ← Adicione esta linha
};