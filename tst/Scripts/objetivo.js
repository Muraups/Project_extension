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
});

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "168139373128-qf583ep0pi75usaur27bj9onjq05qu87.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { 
            theme: "outline", 
            size: "large", 
            type: "standard",
            shape: "pill",
            text: "continue_with",
            logo_alignment: "left"
        }
    );

    google.accounts.id.prompt(); // Exibe o One Tap login
}
