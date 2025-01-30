const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconeBotao = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('/sons/play.wav');
const musicaStop = new Audio('/sons/pause.mp3');
const musicaAlerta = new Audio('/sons/beep.mp3');

let tempoDecorridoSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause()
    }
})


focoBt.addEventListener('click', ()=>{
    tempoDecorridoSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', ()=>{
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', ()=>{
    tempoDecorridoSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
        titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`    
            break;

        case "descanso-curto":
        titulo.innerHTML = `Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`    
            break;

        case "descanso-longo":
        titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`    

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoSegundos <= 0){
        musicaAlerta.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarouPausar)

function iniciarouPausar(){
    if(intervaloId){
        musicaStop.play();
        zerar();
        return;
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iconeBotao.src = '/imagens/pause.png';
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iconeBotao.src = '/imagens/play_arrow.png';
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute:'2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();