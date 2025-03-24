document.addEventListener("DOMContentLoaded", function() {
    // Função para embaralhar as perguntas
    function embaralharPerguntas(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
        }
    }

    // Array de perguntas do quiz
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
                "Apenas pessoas com mais de 21 anos e peso superior a 60kg",
                "Pessoas entre 18 e 69 anos, com peso superior a 50kg e boas condições de saúde",
                "Apenas homens saudáveis com mais de 18 anos"
            ],
            correta: 1,
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

    // Embaralha as perguntas antes de começar o quiz
    embaralharPerguntas(quiz);

    let indiceAtual = 0;
    let respostaSelecionada = null;
    let pontuacao = 0;

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
            btn.style.padding = "10px";
            btn.style.margin = "5px";
            btn.style.border = "1px solid transparent";
            btn.style.borderRadius = "5px";
            btn.style.backgroundColor = "#f0f0f0";
            btn.style.cursor = "pointer";
            btn.style.transition = "background-color 0.3s, transform 0.2s, border 0.2s";
            
            btn.onmouseover = () => btn.style.backgroundColor = "#ddd";
            btn.onmouseout = () => {
                if (!btn.classList.contains("selecionado")) {
                    btn.style.backgroundColor = "#f0f0f0";
                }
            };
            
            btn.onclick = () => {
                respostaSelecionada = i;
                document.querySelectorAll(".opcao").forEach(b => {
                    b.classList.remove("selecionado");
                    b.style.backgroundColor = "#f0f0f0";
                    b.style.border = "1px solid transparent";
                });
                btn.classList.add("selecionado");
                btn.style.backgroundColor = "#d3d3d3";
                btn.style.border = "1px solid black";
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
                opcoes[respostaSelecionada].style.backgroundColor = "#28a745";
                explicacaoEl.textContent = "Resposta correta!";
                explicacaoEl.style.color = "green";
                pontuacao++;
            } else {
                opcoes[respostaSelecionada].style.backgroundColor = "#dc3545";
                opcoes[perguntaAtual.correta].style.backgroundColor = "#28a745";
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
            quizContainer.innerHTML = `<h3>Quiz concluído!</h3><p>Você acertou ${pontuacao} de ${quiz.length} perguntas.</p>`;
            btnProximo.style.display = "none";
        }
    }

    btnEnviar.addEventListener("click", verificarResposta);
    btnProximo.addEventListener("click", proximaPergunta);

    criarPergunta();
});
