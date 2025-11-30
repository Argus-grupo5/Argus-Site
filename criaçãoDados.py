import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

totalArquivos = 30
numeroLinhas = 1440                       # 24 horas * 60 minutos
separador = ';'
diretorio = 'DadosProjeto'

usuarios = [
    'xbox-cloud-br-sp-1', 'xbox-cloud-br-rj-1', 'xbox-cloud-br-pe-1',
    'xbox-cloud-br-rs-1', 'xbox-cloud-br-pa-1', 'xbox-cloud-br-mg-1',
    'xbox-cloud-br-ba-1', 'xbox-cloud-br-am-1', 'xbox-cloud-br-df-1'
]
numeroUsuarios = len(usuarios)

processos_comuns = [
    'Code.exe', 'opera.exe', 'jetbrains-toolbox.exe', 'chrome.exe', 
    'firefox.exe', 'explorer.exe', 'slack.exe', 'spotify.exe', 
    'discord.exe', 'python.exe', 'java.exe', 'steam.exe', 'msedge.exe',
    'powershell.exe', 'svchost.exe', 'lsass.exe', 'System', 'RuntimeBroker.exe'
]

def gerar_dados_aleatorios(usuario_exclusivo):

    # Gerar timestamps 1 por minuto
    dtInicio = datetime(2025, 11, 30, 0, 0, 0)
    timestamps = [
        (dtInicio + timedelta(minutes=i)).strftime('%Y-%m-%d %H:%M:%S')
        for i in range(numeroLinhas)
    ]

    data = {
        'usuario': [usuario_exclusivo] * numeroLinhas,
        'timestamp': timestamps,
        'cpu': np.round(np.random.uniform(5.0, 95.0, numeroLinhas), 1),
        'uso % GPU': np.round(np.random.uniform(0.0, 100.0, numeroLinhas), 2),
        'ram': np.round(np.random.uniform(30.0, 90.0, numeroLinhas), 1),
        'disco': np.round(np.random.uniform(10.0, 95.0, numeroLinhas), 2),
        'swap': np.round(np.random.uniform(0.0, 10.0, numeroLinhas), 1),
        'rede (ms)': np.round(np.random.uniform(0.01, 150.0, numeroLinhas), 3),
        'Qtd_processos': np.random.randint(200, 350, numeroLinhas),
    }

    # Gerar processos
    for i in range(1, 5 + 1):
        data[f'Proc{i}_PID'] = np.random.randint(1000, 30000, numeroLinhas)
        data[f'Proc{i}_Nome'] = np.random.choice(processos_comuns, numeroLinhas)
        data[f'Proc{i}_RamUsada'] = np.round(
            np.random.beta(a=1.5, b=6, size=numeroLinhas) * 8.0 + 0.1, 2
        )

    df = pd.DataFrame(data)
    return df

if not os.path.exists(diretorio):
    os.makedirs(diretorio)

print(f"\n🔄 Iniciando geração dos {totalArquivos} arquivos...")

for i in range(1, totalArquivos + 1):
    usuario_para_arquivo = usuarios[(i - 1) % numeroUsuarios]
    
    df_novo = gerar_dados_aleatorios(usuario_para_arquivo)
    
    nome_arquivo = os.path.join(diretorio, f'{usuario_para_arquivo}-Dados-Raw-30-11-2025.csv')
    
    df_novo.to_csv(nome_arquivo, sep=separador, index=False)
    
    print(f"✔ Arquivo gerado: {nome_arquivo} (Usuário: {usuario_para_arquivo}, 1440 linhas)")

print(f"\n Concluído! Os 30 arquivos estão na pasta: '{diretorio}'")