function handleCredentialResponse(response) {
    if (!response.credential) {
        console.error("Credential is missing.");
        return;
    }

    try {
        const data = jwt_decode(response.credential);
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(data));

        // Esconde o botão de login
        document.getElementById("buttonDiv").style.display = "none";

        // Exibe os dados do usuário
        document.getElementById("userInfo").style.display = "flex";
        document.getElementById("userName").textContent = data.given_name; // Primeiro nome
        document.getElementById("userPic").src = data.picture;

        // Exibe os locais de doação
        exibirLocaisDoacao(); // Chama a função para exibir os locais de doação
    } catch (error) {
        console.error("Error decoding JWT:", error);
    }
}

// Função para exibir os locais de doação
function exibirLocaisDoacao() {
    const locaisDoacaoLondrina = document.getElementById('locaisDoacaoLondrina');
    if (locaisDoacaoLondrina) {
        locaisDoacaoLondrina.style.display = 'block';
    }
}

// Verifica se já existe um usuário logado
document.addEventListener("DOMContentLoaded", function() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        document.getElementById("buttonDiv").style.display = "none";
        document.getElementById("userInfo").style.display = "flex";
        document.getElementById("userName").textContent = userData.given_name; // Primeiro nome
        document.getElementById("userPic").src = userData.picture;

        // Exibe os locais de doação
        exibirLocaisDoacao(); // Chama a função para exibir os locais de doação
    }
});


window.onload = function () {
    google.accounts.id.initialize({
        client_id: "SEU_CLIENT_ID.apps.googleusercontent.com", // Substitua pelo seu Client ID
        callback: handleCredentialResponse
    });

    function renderGoogleButton() {
        const buttonDiv = document.getElementById("buttonDiv");
        const isMobile = window.innerWidth <= 768;

        const buttonConfig = isMobile
            ? {
                theme: "outline",
                type: "icon",
                shape: "circle",
                text: "signin_with",
                logo_alignment: "center",
                width: "48px",
                height: "48px"
            }
            : {
                theme: "outline",
                size: "large",
                type: "standard",
                shape: "pill",
                text: "continue_with",
                logo_alignment: "left"
            };

        // Adicionando um pequeno atraso ANTES de renderizar o botão
        setTimeout(function() {
            google.accounts.id.renderButton(buttonDiv, buttonConfig);
            google.accounts.id.prompt(); // Exibe o One Tap login
        }, 200); // 200 milissegundos de atraso
    }

    renderGoogleButton();
    window.addEventListener('resize', renderGoogleButton);
};


function alternarConteudo() {
    var conteudo = document.getElementById("conteudoExpandido");
    var botao = document.querySelector(".botao"); // Seleciona o botão

    if (conteudo.style.display === "none") {
        conteudo.style.display = "block";
        botao.style.display = "none"; // Oculta o botão
    } else {
        conteudo.style.display = "none";
        botao.style.display = "block"; // Mostra o botão (se necessário)
    }
}