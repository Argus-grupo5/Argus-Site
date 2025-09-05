    
    function servidores(){
        window.location.href = "servidores.html";
    }
    
    function servidores(){
        window.location.href = "usuarios.html";
    }

    function sair(){
        id_sair.innerHTML = `
        
            <div class="popup_sair">
                <h1>Deseja sair?</h1>
                <button onclick="sair_s()">Sim</button>
                <button onclick="sair_n()">Não</button>
            </div>
        `;
    }

    function sair_s(){
        window.location.href = "./login.html";
    }

    function sair_n(){
        id_sair.innerHTML = ``;
    }