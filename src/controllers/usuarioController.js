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
            const user = resultadoAutenticar[0];

            // Se cargo for ROOT usa a foto da empresa, senão a do usuário
            const fotoFinal = user.cargo_cargo === 'ROOT' ? user.empresa_foto : user.user_foto;

            res.json({
              user_id: user.user_id,
              user_name: user.user_name,
              user_sobrenome: user.user_sobrenome,
              user_email: user.user_email,
              user_senha: user.user_senha,
              user_telefone: user.user_telefone,
              user_data: user.user_data,
              empresa_id: user.empresa_id,
              empresa_nome_fantasia: user.empresa_nome_fantasia,
              empresa_razao_social: user.empresa_razao_social,
              empresa_cnpj: user.empresa_cnpj,
              empresa_telefone: user.empresa_telefone,
              empresa_data: user.empresa_data,
              cargo_id: user.cargo_id,
              cargo_cargo: user.cargo_cargo,
              foto: fotoFinal
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

function autenticarEmpresa(req, res) {
  var cnpj = req.body.cnpjServer;
  var senha = req.body.senhaServer;

  if (cnpj == undefined) {
    res.status(400).send("Seu cnpj está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {

    usuarioModel.autenticarEmpresa(cnpj, senha)
      .then(
        function (resultadoAutenticar) {
          console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

          if (resultadoAutenticar.length == 1) {
            console.log(resultadoAutenticar);
            
            const user = resultadoAutenticar[0];
            const fotoFinal = user.cargo_nome === 'ROOT' ? user.empresa_foto : user.user_foto;

            res.json({
              // Dados da empresa
              empresa_id: resultadoAutenticar[0].empresa_id,
              empresa_cnpj: resultadoAutenticar[0].empresa_cnpj,
              empresa_telefone: resultadoAutenticar[0].empresa_telefone,
              empresa_senha: resultadoAutenticar[0].empresa_senha,
              empresa_nome_fantasia: resultadoAutenticar[0].empresa_nome_fantasia,
              empresa_razao_social: resultadoAutenticar[0].empresa_razao_social,
              empresa_data: resultadoAutenticar[0].empresa_data,
              empresa_foto: resultadoAutenticar[0].empresa_foto,
              empresa_acesso: resultadoAutenticar[0].empresa_acesso,


              // Dados do endereço
              endereco_id: resultadoAutenticar[0].endereco_id,
              endereco_rua: resultadoAutenticar[0].endereco_rua,
              endereco_numero: resultadoAutenticar[0].endereco_numero,
              endereco_complemento: resultadoAutenticar[0].endereco_complemento,
              endereco_bairro: resultadoAutenticar[0].endereco_bairro,
              endereco_cidade: resultadoAutenticar[0].endereco_cidade,
              endereco_estado: resultadoAutenticar[0].endereco_estado,
              endereco_cep: resultadoAutenticar[0].endereco_cep,

              // Dados do usuário ROOT 
              user_id: resultadoAutenticar[0].user_id,
              user_name: resultadoAutenticar[0].user_nome,
              user_email: resultadoAutenticar[0].user_email,

              // Dados do cargo
              cargo_id: user.cargo_id,
              cargo_cargo: user.cargo_nome,

              // 🔑 Foto final
              foto: fotoFinal
            });
          } else if (resultadoAutenticar.length == 0) {
            res.status(403).send("Cnpj e/ou senha inválido(s)");
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


function autenticarCodigo(req, res) {
    var id = req.body.idServer;
    var email = req.body.emailServer;
    var codigo = req.body.codigoServer;

    usuarioModel.autenticarCodigo(id, email, codigo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch((erro) => {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
        )
}

function atualizarAcesso(req, res) {
    var id = req.params.idServer

    usuarioModel.atualizarAcesso(id)
        .then((resultado) => {
            res.json(resultado)
        }).catch((erro) => {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
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
  var senha = req.body.senhaServer;
  var razao = req.body.razaoServer;
  var cnpj = req.body.cnpjServer;
  var id = req.body.idServer;
  var foto = req.file.filename;
  var codigo = Math.floor(Math.random() * 9000) + 1000;

  if (foto == undefined) {
    res.status(400).send("Sua foto está undefined!");
  } else if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("O cnpj está undefined!");
  } else if (razao == undefined) {
    res.status(400).send("A razao está undefined!");
  } else if (id == undefined) {
    res.status(400).send("O id está undefined!");
  }

  usuarioModel.cadastrarEmpresa(nome, telefone, senha, cnpj, razao, id, foto, codigo)
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

//Tela de funcionários
function listarFuncionarios(req, res) {
  const idEmpresa = req.query.idEmpresa;

  if (!idEmpresa) {
    return res.status(400).send("ID da empresa é obrigatório");
  }

  usuarioModel.listarFuncionarios(idEmpresa)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum funcionário encontrado");
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar funcionários:", erro);
      res.status(500).json({ error: "Erro interno do servidor" });
    });
}

function listarCargo(req, res) {
  var idEmpresa = req.query.idEmpresa || sessionStorage.EMPRESA_ID;

  if (idEmpresa == undefined) {
    res.status(400).send("ID da empresa está undefined!");
    return;
  }

  usuarioModel.listarCargo(idEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json(erro);
    });
}

function funcao_adicionar(req, res) {
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
          "\nHouve um erro ao realizar ao adicionar! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function funcao_editar_funcionario(req, res) {
  var funcionario_cargo = req.body.cargoServer;
  var funcionario_email = req.body.emailServer;
  var funcionario_telefone = req.body.telefoneServer;
  var id = req.body.idServer;

  if (funcionario_cargo == undefined) {
    res.status(400).send("O cargo está undefined!");
  } else if (funcionario_email == undefined) {
    res.status(400).send("O email está undefined!");
  } else if (funcionario_telefone == undefined) {
    res.status(400).send("O telefone está undefined!");
  } else if (id == undefined) {
    res.status(400).send("O id está undefined!");
  }

  usuarioModel.funcao_editar_funcionario(funcionario_cargo, funcionario_email, funcionario_telefone, id)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao alterar as informações do usuário! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function funcao_editar(req, res) {
    console.log("=== DEBUG funcao_editar ===");
    console.log("Body recebido:", req.body);
    console.log("Arquivo recebido:", req.file);
    console.log("Files recebidos:", req.files);
    
    var funcionario_nome = req.body.nomeServer;
    var funcionario_sobrenome = req.body.sobrenomeServer;
    var funcionario_senha = req.body.senhaServer;
    var funcionario_telefone = req.body.telefoneServer;
    var senhaAntiga = req.body.senhaAntigaServer;
    var id = req.body.idServer;
    var foto = req.file ? req.file.filename : null;

    console.log("Foto filename:", foto);
    console.log("ID do usuário:", id);

    if (funcionario_nome == undefined) {
        return res.status(400).send("O nome é obrigatório!");
    } else if (funcionario_sobrenome == undefined) {
        return res.status(400).send("O sobrenome é obrigatório!");
    } else if (senhaAntiga == undefined) {
        return res.status(400).send("A senha antiga é obrigatória!");
    } else if (id == undefined) {
        return res.status(400).send("O id é obrigatório!");
    }

    // Verificar se a senha antiga está correta
    usuarioModel.verificarSenhaAntiga(id, senhaAntiga)
        .then(resultado => {
            if (resultado.length === 0) {
                return res.status(400).json("Senha antiga incorreta");
            }
            
            return usuarioModel.funcao_editar(
                funcionario_nome, 
                funcionario_sobrenome, 
                funcionario_senha, 
                funcionario_telefone, 
                id,
                foto
            )
            .then(resultado => {
                res.json({
                    success: true,
                    message: "Usuário atualizado com sucesso",
                    foto: foto
                });
            });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({
                success: false,
                error: erro.sqlMessage || "Erro interno do servidor"
            });
        });
}

function funcao_editar_proprio(req, res) {
  var funcionario_nome = req.body.nomeServer;
  var funcionario_sobrenome = req.body.sobrenomeServer;
  var funcionario_senha = req.body.senhaServer;
  var funcionario_email = req.body.emailServer;
  var funcionario_telefone = req.body.telefoneServer;
  var id = sessionStorage.USER_ID;

  if (funcionario_nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (funcionario_sobrenome == undefined) {
    res.status(400).send("Seu sobrenome está undefined!");
  } else if (funcionario_senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (funcionario_email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (funcionario_telefone == undefined) {
    res.status(400).send("O telefone está undefined!");
  } else if (id == undefined) {
    res.status(400).send("O id está undefined!");
  }

  usuarioModel.funcao_editar_proprio(funcionario_nome, funcionario_sobrenome, funcionario_senha, funcionario_email, funcionario_telefone, id)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao alterar suas informações ! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function funcao_excluir(req, res) {
  var id = req.body.idServer;
  console.log('Tentando excluir usuário ID:', id);

  if (id == undefined) {
    console.log('ID undefined');
    res.status(400).send("O id estão undefined!");
    return;
  }

  usuarioModel.funcao_excluir(id)
    .then((resultado) => {
      console.log('Resultado da exclusão:', resultado);
      if (resultado.affectedRows > 0) {
        res.status(200).json({ message: "Usuário excluído com sucesso", affectedRows: resultado.affectedRows });
      } else {
        res.status(404).send("Nenhum funcionário encontrado com este ID");
      }
    })
    .catch((erro) => {
      console.error("Erro ao excluir funcionário:", erro);
      res.status(500).json({ error: erro.sqlMessage || "Erro interno do servidor" });
    });
}


function online(req, res) {
  var status = req.body.status;
  var idUsuario = req.body.idServer;

  console.log(`Status update - User: ${idUsuario}, Status: ${status}`);

  usuarioModel.online(idUsuario, status)
    .then(() => res.json({ success: true }))
    .catch(erro => {
      console.error("Erro no online:", erro);
      res.status(500).json({ error: "Erro interno" });
    });
}

function editar_empresa_root(req, res) {
    console.log("Body recebido:", req.body);
    console.log("Arquivo recebido:", req.file);
    
    var nomeFantasia = req.body.nomeFantasiaServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;
    var senhaAntiga = req.body.senhaAntigaServer;
    var empresaId = req.body.empresaIdServer;
    var foto = req.file ? req.file.filename : null;

    console.log("Dados recebidos:", {
        nomeFantasia, telefone, senha, senhaAntiga, empresaId, foto
    });

    if (nomeFantasia == undefined) {
        res.status(400).send("Nome fantasia está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Telefone está undefined!");
    } else if (senhaAntiga == undefined) {
        res.status(400).send("Senha antiga está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("ID da empresa está undefined!");
    } else {
        usuarioModel.editar_empresa_root(nomeFantasia, telefone, senha, senhaAntiga, empresaId, foto)
            .then(function (resultado) {
                console.log("Resultado da atualização:", resultado);
                
                res.json({
                    success: true,
                    message: "Empresa atualizada com sucesso",
                    nomeFantasia: nomeFantasia,
                    telefone: telefone,
                    foto: foto
                });
            })
            .catch(function (erro) {
                console.log("Erro na atualização:", erro);
                console.log("\nHouve um erro ao editar a empresa! Erro: ", erro.sqlMessage);
                res.status(500).json({
                    success: false,
                    error: erro.sqlMessage
                });
            });
    }
}

function buscar_cargo(req, res) {
  var userId = req.params.id;

  if (!userId) {
    return res.status(400).send("ID do usuário é obrigatório");
  }

  usuarioModel.buscar_cargo(userId)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json({ cargo: resultado[0].cargo_cargo });
      } else {
        res.status(404).send("Usuário não encontrado");
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar cargo:", erro);
      res.status(500).json({ error: "Erro interno do servidor" });
    });
}


module.exports = {
  autenticar,
  autenticarCodigo,
  atualizarAcesso,
  autenticarEmpresa,
  editar,
  cadastrarEndereco,
  cadastrarEmpresa,
  listarFuncionarios,
  listarCargo,
  funcao_adicionar,
  funcao_editar,
  funcao_editar_proprio,
  funcao_excluir,
  online,
  editar_empresa_root,
  funcao_editar_funcionario,
  buscar_cargo

}