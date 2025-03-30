const imagens = document.querySelector('.banner-imagens');
const indicadores = document.querySelectorAll('.indicador');
let indiceAtual = 0;

function mostrarImagem(indice) {
    imagens.style.transform = `translateX(-${indice * 33.33}%)`;
    indicadores.forEach(indicador => indicador.classList.remove('ativo'));
    indicadores[indice].classList.add('ativo');
}

function proximaImagem() {
    indiceAtual = (indiceAtual + 1) % indicadores.length;
    mostrarImagem(indiceAtual);
}

setInterval(proximaImagem, 5000); // Troca de imagem a cada 5 segundos

indicadores.forEach((indicador, indice) => {
    indicador.addEventListener('click', () => {
        indiceAtual = indice;
        mostrarImagem(indiceAtual);
    });
});