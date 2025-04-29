document.addEventListener("DOMContentLoaded", function() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        // Atualiza o perfil principal
        document.getElementById("fullName").textContent = userData.name;
        document.getElementById("sub").textContent = userData.sub;
        document.getElementById("given_name").textContent = userData.given_name;
        document.getElementById("family_name").textContent = userData.family_name;
        document.getElementById("email").textContent = userData.email;
        document.getElementById("profilePicture").src = userData.picture;

        // Atualiza o cabeçalho
        document.getElementById("userInfo").style.display = "flex";
        document.getElementById("userName").textContent = userData.given_name;
        document.getElementById("userPic").src = userData.picture;

         // Recupera dados extras do usuário (nome editado e status de doador)
        const savedData = JSON.parse(localStorage.getItem(`userExtra_${userData.sub}`));
        if (savedData) {
            document.getElementById("given_name").textContent = savedData.username || userData.given_name;
            document.getElementById("isDonor").textContent = savedData.isDonor || "Não informado";
        } else {
            document.getElementById("isDonor").textContent = "Não informado";
        }

        // Verifica o status do email
        if (userData.email_verified) {
            document.getElementById("emailVerificationStatus").textContent = "🟢";
            document.getElementById("emailVerificationStatus").title = "Email Verificado.";
        } else {
            document.getElementById("emailVerificationStatus").textContent = "";
            document.getElementById("emailVerificationStatus").title = "Email Não Verificado.";
        }

    } else {
        alert("Nenhum dado de usuário encontrado. Faça login novamente.");
        window.location.href = "index.html";
    }
});

function logout() {
    localStorage.removeItem("userData");
    window.location.href = "index.html";
};


function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('open');
}

document.addEventListener('click', function(event) {
    const sideMenu = document.getElementById('sideMenu');
    const menuIcon = document.querySelector('.menu-icon');
    const isClickInsideMenu = sideMenu.contains(event.target);
    const isClickInsideIcon = menuIcon && menuIcon.contains(event.target);
    const isMenuOpen = sideMenu.classList.contains('open');

    if (isMenuOpen && !isClickInsideMenu && !isClickInsideIcon) {
        sideMenu.classList.remove('open');
    }
});