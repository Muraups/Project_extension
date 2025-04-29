
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

function handleCredentialResponse(response) {
    if (!response.credential) {
        console.error("Credential is missing.");
        return;
    }

    try {
        const data = jwt_decode(response.credential);
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(data));

        document.getElementById("buttonDiv").style.display = "none";

        document.getElementById("userInfo").style.display = "flex";
        document.getElementById("userName").textContent = data.given_name; // Primeiro nome
        document.getElementById("userPic").src = data.picture;
    } catch (error) {
        console.error("Error decoding JWT:", error);
    }
}

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

document.addEventListener("DOMContentLoaded", function() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        document.getElementById("userInfo").style.display = "flex";
        document.getElementById("userName").textContent = userData.given_name; // Primeiro nome
        document.getElementById("userPic").src = userData.picture;
    }
});

