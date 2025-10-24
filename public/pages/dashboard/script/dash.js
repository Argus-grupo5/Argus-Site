// window.addEventListener('onbeforeunload', function () {
//   fetch("/usuarios/online", {
//     method: "put",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       status: 0,
//       idServer: sessionStorage.USER_ID
//     }),
//   })
//     .then(response => {
//       if (!response.ok) throw new Error("Erro ao alterar usuário");
//       return response.json();
//     })
//     .catch(error => {
//       console.error(`#ERRO: ${error}`);
//       return false;
//     });
// });


function header(pag, cargo) {
  console.log(cargo)
  let caminho;
  if (cargo == "Operador") {
    caminho = "serversSup";
  } else {
    caminho = "servers"
  }
  nav = document.getElementById("navDesktop")
  nav.innerHTML = `
      <div class="navButtons">
      <a href="./perfil.html" class="navButton tooltipNav" id="navUser">
        <img src="../../../assets/fotoPerfil/${sessionStorage.USER}" alt="" id="FotoNavBar">
        <span class="tooltiptextNav">
          <div id="userNome">${sessionStorage.USER_NAME}</div>
          <div id="userCargo">${sessionStorage.CARGO_CARGO}</div>
        </span>
      </a>
      <a href="./${caminho}.html" class="navButton tooltipNav" id="navServers">
        <img id="imgServidores" src="../../assets/dashboard/desktop/box.svg" alt="Servidores">
        <span class="tooltiptextNav">Servidores</span>
      </a>

      <a href="./funcionarios.html" class="navButton tooltipNav" id="navServers">
        <img id="imgFuncionarios" src="../../assets/dashboard/desktop/employes.svg" alt="Funcionários">
        <span class="tooltiptextNav">Funcionários</span>
      </a>

      <div class="navButton tooltipNav" id="navServers" onclick="sair()">
        <img src="../../assets/dashboard/desktop/logout.svg" alt="Sair">
        <span class="tooltiptextNav">Sair</span>
      </div>
    </div>
    <img class="logo" src="../../assets/icon/logoBlack.svg" alt="">
  `

  if (pag == "funcionario") imgFuncionarios.classList.add("selected");
  else if (pag == "server") imgServidores.classList.add("selected");
  else if (pag == "dashboard") imgServidores.classList.add("selected")
}

function abrir_popup() {
  document.getElementById("overlay").style.display = "flex";
  document.body.classList.add("popup-open");
}

function fechar_popup() {
  document.getElementById("overlay").style.display = "none";
  document.body.classList.remove("popup-open");
  config_funcionarios.innerHTML = '';
}

function sair() {
  id_sair.innerHTML = `
  <div class="popup_sair">
      <h1>Deseja sair?</h1>
      <button onclick="sair_s()">Sim</button>
      <button onclick="sair_n()">Não</button>
  </div>
  `;
}
function sair_s() {
  sessionStorage.clear();
  window.location.href = "../login.html";
}

function sair_n() {
  id_sair.innerHTML = ``;
}

function carregarCargoUsuario() {
  const userId = sessionStorage.USER_ID;

  if (!userId) {
    console.warn("USER_ID não encontrado no sessionStorage");
    return;
  }

  fetch(`/usuarios/cargoUsuario/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar cargo");
      return response.json();
    })
    .then(data => {
      sessionStorage.CARGO_CARGO = data.cargo;
      console.log("Cargo carregado:", data.cargo);
      buscarPermissoesPorCargo();

      // Atualiza a UI se necessário
      const elementoCargo = document.getElementById('userCargo');
      if (elementoCargo) {
        elementoCargo.textContent = data.cargo;
      }
    })
    .catch(error => {
      console.error("Erro:", error);
      sessionStorage.CARGO_CARGO = "N/A"; // Valor padrão
    });
}


