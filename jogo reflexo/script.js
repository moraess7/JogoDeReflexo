// ============================================================
// Treino de Reflexo Rápido - Temporizador + Coordenadas DOM
// ============================================================

// ----- Seleção dos elementos da página -----
const btnIniciar = document.querySelector('#btnIniciar');
const alvo       = document.querySelector('#alvo');
const areaJogo   = document.querySelector('#areaJogo');
const placar     = document.querySelector('#placar');
const resultado  = document.querySelector('#resultado');

// ----- Variáveis de controle do jogo -----
let tempoRestante = 10;
let pontos        = 0;
let cronometro    = null; // guardará o ID do setInterval

// ============================================================
// 2. Manipulação de coordenadas - reposicionamento aleatório
// ============================================================
function reposicionarAlvo() {

    // ----- Limites visíveis do contêiner (offsetWidth/offsetHeight)
    //       descontando a dimensão do próprio alvo -----
    const maxX = areaJogo.offsetWidth  - alvo.offsetWidth;
    const maxY = areaJogo.offsetHeight - alvo.offsetHeight;

    // ----- Posições aleatórias dentro dos limites -----
    const posX = Math.floor(Math.random() * maxX);
    const posY = Math.floor(Math.random() * maxY);

    // ----- Aplica as coordenadas no alvo -----
    alvo.style.left = posX + 'px';
    alvo.style.top  = posY + 'px';
}

// ============================================================
// Função auxiliar: atualiza o texto do placar na tela
// ============================================================
function atualizarPlacar() {
    placar.textContent = 'Tempo restante: ' + tempoRestante + 's | Pontos: ' + pontos;
}

// ============================================================
// 4. Finalização do jogo
// ============================================================
function encerrarJogo() {

    // ----- Interrompe a rotina assíncrona -----
    clearInterval(cronometro);
    cronometro = null;

    // ----- Oculta o alvo -----
    alvo.style.display = 'none';

    // ----- Reativa o botão inicial -----
    btnIniciar.disabled = false;

    // ----- Mensagem de resultado na página -----
    resultado.textContent = 'Fim do jogo! Você marcou ' + pontos + ' pontos.';

    // ----- Notificação/alerta com a pontuação final -----
    alert('Tempo esgotado! Pontuação final: ' + pontos + ' pontos.');
}

// ============================================================
// 1. Temporização assíncrona - botão Iniciar
// ============================================================
btnIniciar.addEventListener('click', function () {

    // ----- Reinicia os valores do jogo -----
    tempoRestante = 10;
    pontos = 0;
    atualizarPlacar();
    resultado.textContent = '';

    // ----- Previne disparos concorrentes: desabilita o botão -----
    btnIniciar.disabled = true;

    // ----- Exibe o alvo e posiciona na área -----
    alvo.style.display = 'block';
    reposicionarAlvo();

    // ----- Contagem decrescente de 10s a cada 1000ms -----
    cronometro = setInterval(function () {

        tempoRestante--;            // decrementa 1 segundo
        atualizarPlacar();          // reflete na tela

        // ----- Quando o tempo atingir 0, encerra o jogo -----
        if (tempoRestante <= 0) {
            encerrarJogo();
        }

    }, 1000);
});

// ============================================================
// 3. Interatividade - clique no alvo (ponto + reposiciona)
// ============================================================
alvo.addEventListener('click', function () {

    // Só pontua se o jogo estiver em andamento
    if (cronometro === null) {
        return;
    }

    pontos++;                 // incrementa a pontuação (+1)
    atualizarPlacar();        // atualiza o indicador
    reposicionarAlvo();       // move o alvo imediatamente
});