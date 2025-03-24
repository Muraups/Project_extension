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
                "700 ml",
                "500 ml"
            ],
            correta: 2,
            explicacao: "A quantidade de sangue doada em uma doação é geralmente de 500 ml, o que é suficiente para ajudar a salvar várias vidas."
        },
        {
            pergunta: "Quantas vezes uma pessoa pode doar sangue ao longo do ano?",
            opcoes: [
                "Homens podem doar 6 vezes e mulheres 4 vezes por ano",
                "Homens podem doar 3 vezes e mulheres 2 vezes por ano",
                "Homens podem doar 4 vezes, mulheres 3 vezes, com intervalos de 60 e 90 dias respectivamente."
            ],
            correta: 2,
            explicacao: "Homens podem doar 4 vezes, mulheres 3 vezes, com intervalos de 60 e 90 dias respectivamente, pois os níveis de ferro dos homens costumam ser mais altos e as mulheres costumam perder sangue naturalmente no ciclo menstrual."
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
        },
        {
            pergunta: " Pessoas de qualquer tipo sanguíneo podem doar sangue?",
            opcoes: [
                "Não, apenas pessoas com sangue tipo O podem doar",
                " Apenas pessoas com Rh positivo podem doar sangue",
                "Sim, mas o tipo O negativo é mais útil"
            ],
            correta: 2,
            explicacao: "o tipo O negativo é mais útil pois pode ser transfundido para qualquer pessoa, independentemente do seu tipo sanguíneo, sem risco imediato de reação adversa."
        },
        {
            pergunta: "Quais são os cuidados antes de fazer a doação de sangue?",
            opcoes: [
                " Não ingerir alimentos sólidos e estar em jejum por 24 horas",
                "Apenas estar sem febre ou sintomas de doenças",
                "Estar descansado, alimentado e sem ter consumido álcool nas últimas 24  horas."
            ],
            correta: 2,
            explicacao: "Essas recomendações garantem a segurança do doador e do receptor durante a doação de sangue."
        },  
        {
            pergunta: "Quanto tempo demora para o organismo repor o volume de sangue doado?",
            opcoes: [
                "Apenas algumas horas",
                "1 a 2 dias",
                "Cerca de 1 semana"
            ],
            correta: 1,
            explicacao: "O volume de sangue doado é reposto pelo organismo em 1 a 2 dias, enquanto os componentes como células podem levar um pouco mais de tempo."
        },
        {
            pergunta: "Qual é o benefício direto da doação de sangue para o doador?",
            opcoes: [
                "Melhora imediata da saúde",
                "Diagnóstico de algumas condições de saúde por meio de exames realizados",
                "Aumento da produção de glóbulos vermelhos"
            ],
            correta: 1,
            explicacao: "Ao doar sangue, o doador passa por exames que podem indicar algumas condições de saúde, ajudando no cuidado preventivo."
        },
        {
            pergunta: "Quem pode se beneficiar do sangue doado?",
            opcoes: [
                "Pessoas em várias condições, como acidentes, cirurgias e tratamentos de saúde",
                "Somente pacientes em cirurgias complexas",
                "Apenas pessoas envolvidas em acidentes"
            ],
            correta: 0,
            explicacao: "O sangue doado é usado em emergências, cirurgias, tratamentos de doenças como anemias graves e muito mais."
        },
        
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
                explicacaoEl.textContent = "Resposta Correta: Explicação: " + perguntaAtual.explicacao;
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
