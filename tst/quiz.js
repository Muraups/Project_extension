document.addEventListener("DOMContentLoaded", function() {
    const quiz = [
        {
            pergunta: "Qual é a quantidade de sangue doada em uma doação de sangue?",
            opcoes: [
                "300 ml",
                "500 ml",
                "700 ml"
            ],
            correta: 1,
            explicacao: "A quantidade de sangue doada em uma doação é geralmente de 500 ml, o que é suficiente para ajudar a salvar várias vidas."
        },
        {
            pergunta: "Qual é o tempo recomendado para fazer uma nova doação de sangue?",
            opcoes: [
                "1 semana",
                "2 meses",
                "6 meses"
            ],
            correta: 1,
            explicacao: "O tempo recomendado para fazer uma nova doação de sangue é de 2 meses para homens e 3 meses para mulheres."
        },
        {
            pergunta: "Quem pode ser doador de sangue?",
            opcoes: [
                "Qualquer pessoa acima de 18 anos e com boa saúde",
                "Pessoas com doenças crônicas",
                "Somente pessoas que já fizeram a doação anteriormente"
            ],
            correta: 0,
            explicacao: "Qualquer pessoa saudável entre 18 e 69 anos, com peso acima de 50kg, pode ser um doador de sangue, desde que não tenha contraindicações."
        },
        {
            pergunta: "Quanto tempo dura uma doação de sangue?",
            opcoes: [
                "5 a 10 minutos",
                "15 a 20 minutos",
                "30 a 40 minutos"
            ],
            correta: 0,
            explicacao: "O processo de doação de sangue geralmente leva entre 5 e 10 minutos, mas o tempo total pode ser maior com o processo de coleta e repouso."
        },
        {
            pergunta: "O que acontece com o sangue doado?",
            opcoes: [
                "É utilizado imediatamente em emergências",
                "É armazenado para uso futuro em hospitais",
                "É descartado após um certo tempo"
            ],
            correta: 1,
            explicacao: "O sangue doado é armazenado em bancos de sangue e pode ser utilizado para transfusões em hospitais ou para pacientes que necessitam."
        }
    ];

    let indiceAtual = 0;
    let respostaSelecionada = null;

    const quizContainer = document.getElementById("quiz-container");
    const btnEnviar = document.getElementById("enviar");
    const btnProximo = document.getElementById("proximo");
    const explicacaoEl = document.getElementById("explicacao");

    function criarPergunta() {
        const perguntaAtual = quiz[indiceAtual];
        
        quizContainer.innerHTML = `
            <p>${perguntaAtual.pergunta}</p>
            <div id="opcoes"></div>
        `;

        const opcoesContainer = document.getElementById("opcoes");

        perguntaAtual.opcoes.forEach((opcao, i) => {
            const btn = document.createElement("button");
            btn.textContent = opcao;
            btn.classList.add("opcao");
            btn.onclick = () => {
                respostaSelecionada = i;
                document.querySelectorAll(".opcao").forEach(b => b.classList.remove("selecionado"));
                btn.classList.add("selecionado");
                btnEnviar.disabled = false;
            };
            opcoesContainer.appendChild(btn);
        });

        btnEnviar.style.display = "inline-block";
        btnEnviar.disabled = true;
        btnProximo.style.display = "none";
        explicacaoEl.style.display = "none";
    }

    function verificarResposta() {
        const perguntaAtual = quiz[indiceAtual];
        const opcoes = document.querySelectorAll(".opcao");

        if (respostaSelecionada !== null) {
            if (respostaSelecionada === perguntaAtual.correta) {
                opcoes[respostaSelecionada].classList.add("correta");
                explicacaoEl.textContent = "Resposta correta!";
                explicacaoEl.style.color = "green";
            } else {
                opcoes[respostaSelecionada].classList.add("errada");
                opcoes[perguntaAtual.correta].classList.add("correta");
                explicacaoEl.textContent = "Errado! " + perguntaAtual.explicacao;
                explicacaoEl.style.color = "red";
            }
            opcoes.forEach(botao => botao.disabled = true);
            explicacaoEl.style.display = "block";
            btnEnviar.style.display = "none";
            btnProximo.style.display = "inline-block";
        }
    }

    function proximaPergunta() {
        if (indiceAtual < quiz.length - 1) {
            indiceAtual++;
            criarPergunta();
        } else {
            quizContainer.innerHTML = "<h3>Quiz concluído!</h3>";
            btnProximo.style.display = "none";
        }
    }

    btnEnviar.addEventListener("click", verificarResposta);
    btnProximo.addEventListener("click", proximaPergunta);

    criarPergunta();
});
