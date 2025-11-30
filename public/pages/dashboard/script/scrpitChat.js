const chaveApi = "AIzaSyCnVNrDYgzffofFUJJMZ0Dvw-xBqq2Ib8o";

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const toggleButton = document.getElementById('toggle-button');

    chatContainer.classList.toggle('expanded');

    if (chatContainer.classList.contains('expanded')) {
        toggleButton.textContent = 'X';
    } else {
        toggleButton.textContent = '_';
    }
}

function enviarMensagem() {
    var mensagem = document.getElementById("input-mensagem")
    if (!mensagem.value) {
        mensagem.style.border = '1px solid red'
        return;
    }
    mensagem.style.border = 'none';

    var status = document.getElementById('status')
    var botaoMensagem = document.getElementById('botao');

    status.style.display = 'block'
    status.innerHTML = "Carregando...";
    botaoMensagem.disabled = true
    botaoMensagem.style.cursor = 'not-allowed'
    mensagem.disabled = true


        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${chaveApi}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: mensagem.value }
                        ]
                    }
                ], generationConfig: {
                maxOutputTokens: 1048,   
                temperature: 0.5     
            }
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Resposta Gemini:", data);

                let respostaChat = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                 mostrarHistorico(mensagem.value , respostaChat)
                status.style.display = 'none'


            })
            .catch(err => console.error("Erro:", err))
            .finally(() => {
                botaoMensagem.disabled = false
                botaoMensagem.style.cursor = 'pointer'
                mensagem.disabled = false
                mensagem.style.border = 'block';

            })
    }

    function mostrarHistorico(mensagem, resposta){
        var historico = document.getElementById('historico')

   
        var boxMensagemCliente = document.createElement('div')
        boxMensagemCliente.className = 'caixa-mensagem-cliente'

        var mensagemCliente = document.createElement('p')
        mensagemCliente.className = 'mensagem-cliente'
        mensagemCliente.innerHTML = mensagem

        boxMensagemCliente.appendChild(mensagemCliente)
        historico.appendChild(boxMensagemCliente)

        
        var boxRespostaMensagem = document.createElement('div')
        boxRespostaMensagem.className = 'caixa-reposta-chat'

        var chatResposta = document.createElement('p')
        chatResposta.className = 'resposta-chat'
        chatResposta.innerHTML = resposta

        boxRespostaMensagem.appendChild(chatResposta)
        historico.appendChild(boxRespostaMensagem)

        historico.scrollTop = historico.scrollHeight
    }

// referencia para criação: https://www.youtube.com/watch?v=lLSJxmb13ec


