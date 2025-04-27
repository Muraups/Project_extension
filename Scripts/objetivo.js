// OBJETIVO.JS
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
    } catch (error) {
        console.error("Error decoding JWT:", error);
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
    }

    renderGoogleButton(); // Chama a função para renderizar o botão ao carregar a página
});

window.onload = function () {
    // Inicialização é feita no DOMContentLoaded para garantir que o elemento buttonDiv exista
};

function renderGoogleButton() {
    const buttonDiv = document.getElementById("buttonDiv");
    if (!buttonDiv) {
        console.error("Elemento buttonDiv não encontrado.");
        return;
    }

    google.accounts.id.initialize({
        client_id: "168139373128-qf583ep0pi75usaur27bj9onjq05qu87.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

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

    // Adicionando um pequeno atraso antes de renderizar o botão (pode ajudar com o carregamento da API)
    setTimeout(function() {
        google.accounts.id.renderButton(buttonDiv, buttonConfig);
        google.accounts.id.prompt(); // Exibe o One Tap login
    }, 200);
}

// Adiciona um listener para redimensionamento da tela para re-renderizar o botão se necessário
window.addEventListener('resize', renderGoogleButton);