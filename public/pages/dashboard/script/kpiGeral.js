const servers = [
    { name: "Servidor Geforce Now", nivel: 4, recursos: ["CPU", "RAM"], localizacao: "São Paulo - SP" },
    { name: "Servidor SPTech", nivel: 3, recursos: ["CPU", "GPU"], localizacao: "São Paulo - SP" },
    { name: "Servidor BandTec", nivel: 5, recursos: ["CPU", "GPU", "Armazenamento"], localizacao: "São Paulo - SP" },
    { name: "Servidor Xbox", nivel: 1, recursos: ["GPU"], localizacao: "Rio de Janeiro - RJ" },
    { name: "Servidor Stadia", nivel: 2, recursos: ["CPU", "RAM"], localizacao: "Belo Horizonte - MG" }
];

    const elMonitored = document.getElementById("id_servidores_monitorados");
    const elQtdCritico = document.getElementById("qtd_critico");
    const elQtdAlerta = document.getElementById("qtd_alerta");
    const elServerList = document.getElementById("id_server_list");
    elMonitored.textContent = servers.length;

function getRiskStatusFromLevel(nivel) {
    const n = Number(nivel);
    if (n === 1) return "ok";
    if (n > 1 && n <= 3) return "atention";
    if (n >= 4) return "danger";
    return "indisponivel";
}

function updateKPIs() {
    let critico = 0;
    let alerta = 0;
    for (let i = 0; i < servers.length; i++) {
        const status = getRiskStatusFromLevel(servers[i].nivel);
        if (status === "danger") critico++;
        else if (status === "atention") alerta++;
    }
    elQtdCritico.textContent = critico;
    elQtdAlerta.textContent = alerta;
}

function goServer(){
    window.location = "servers.html";
}
updateKPIs();

