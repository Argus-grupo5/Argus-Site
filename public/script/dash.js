window.onload = function () {
  fetch("/usuarios/online", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: 1,
      idServer: sessionStorage.USER_ID
    }),
  })
    .then(response => {
      if (!response.ok) throw new Error("Erro ao alterar usuário");
      return response.json();
    })
    .catch(error => {
      console.error(`#ERRO: ${error}`);
      return false;
    });

  header()
}

window.addEventListener('onbeforeunload', function () {
  fetch("/usuarios/online", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: 0,
      idServer: sessionStorage.USER_ID
    }),
  })
    .then(response => {
      if (!response.ok) throw new Error("Erro ao alterar usuário");
      return response.json();
    })
    .catch(error => {
      console.error(`#ERRO: ${error}`);
      return false;
    });
});

function header() {
  navDesktop.innerHTML += `
  <div class="navButtons">
      <div class="navButton tooltipNav" id="navUser">
          <img src="../assets/dashboard/desktop/user.svg" alt="">
          <span class="tooltiptextNav">
              <div id="userNome"></div>
              <div id="userCargo">ADM</div>
          </span>
      </div>
      <div class="navButton tooltipNav" id="navServers">
          <img class="selected" src="../assets/dashboard/desktop/box.svg" alt="Servidores">
          <span class="tooltiptextNav">Servidores</span>
      </div>
      <div class="navButton tooltipNav" id="navServers">
          <img src="../assets/dashboard/desktop/employes.svg" alt="Funcionários">
          <span class="tooltiptextNav">Funcionários</span>
      </div>
      <div class="navButton tooltipNav" id="navServers">
          <img src="../assets/dashboard/desktop/logs.svg" alt="Logs">
          <span class="tooltiptextNav">Logs</span>
      </div>
      <div class="navButton tooltipNav" id="navServers">
          <img src="../assets/dashboard/desktop/headphone.svg" alt="Suporte">
          <span class="tooltiptextNav">Suporte</span>
      </div>
      <div class="navButton tooltipNav" id="navServers" onclick="sair()">
          <img src="../assets/dashboard/desktop/logout.svg" alt="Sair">
          <span class="tooltiptextNav">Sair</span>
      </div>
  </div>
  <img class="logo" src="../assets/icon/logoBlack.svg" alt="">
  `
}