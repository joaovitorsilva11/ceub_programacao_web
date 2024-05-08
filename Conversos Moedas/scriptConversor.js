const valoresConversao = {
    real: {
        euro: 0.19,
        dolar: 0.2,
        simbolo: "R$"
    },
    dolar:{
        real: 4.99,
        euro: 0.92,
        simbolo: "USD"

    },
    euro: {
        real:5.4,
        dolar: 1.08,
        simbolo: "£"
    }
}

const botaoInverter = document.getElementById("btn-inverter");
 botaoInverter.addEventListener("click", inverter);

const botaoConverter = document.getElementById("btn-converter");
 botaoConverter.addEventListener("click", converter);
 
const botaoLimpar = document.getElementById("btn-limpar");
 botaoLimpar.addEventListener("click", limpar);

const botaoAceitaMensagem = document.getElementById("btnMensagem");
botaoAceitaMensagem.addEventListener("click", aceitarMensagem);

if(localStorage.getItem("aceitouCookie") == "1") {
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto")
}

function aceitarMensagem() {
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto")

    localStorage.setItem("aceitouCookie", "1")
}

function buscaConversaoAPI() {
    fetch("https://economia.awesomeapi.com.br/last/USD-BRL").then(function(response) {
        console.log(response);
    }).then(function(data){
        console.log(data);
    }).catch(function(error){
        console.log(error);
    })
}

let valorUsuario = document.getElementById("valorEntrada");
valorUsuario.addEventListener("keypress", function (event) {
    if(event.ctrlKey == true && event.code == "KeyI") {
        inverter();
    }
    if(event.key == "Enter") {
        event.preventDefault();
        converter();
    }
    if(event.crtlKey == true && event.code == "L") {
        event.preventDefault();
        limpar();
    }
})
function converter() {
    buscaConversaoAPI();
     
    let historicoRecuperado = recuperarHistorico();

    let valorUsuario = document.getElementById("valorEntrada").value
    let moeda1 = document.getElementById("moeda1").value
    let moeda2 = document.getElementById("moeda2").value
    if (valorUsuario <= 0 || valorUsuario == "") {
        alert("Verificar valor")
        return;
    } 
    if(moeda1 == moeda2) {
        alert("As moedas são iguais!")
        return;
    } else if (moeda1 == "start" || moeda2 == "end") {
        alert("Selecione corretamente as moedas!")
        return;
    }

    let simbolo = valoresConversao[moeda2]["simbolo"];
    let resultado = valorUsuario * valoresConversao[moeda1][moeda2];
    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + " " + resultado.toFixed(2);

    let objetoResultado = {
        valorDoUsuario: valorUsuario,
        valorMoeda1: moeda1,
        valorMoeda2: moeda2,
        valorResultado: resultado.toFixed(2)
    }

    // let objetoResultadoJSON = JSON.stringify(objetoResultado);

    // localStorage.setItem("historico", objetoResultadoJSON);

    // console.log(objetoResultado);
    // localStorage.setItem("historico", objetoResultadoJSON)

    salvarHistorico(objetoResultado)
}

function recuperarHistorico() {
    let historico = localStorage.getItem("historico")
    let historicoObjeto = JSON.parse(historico)
    if(!historico) {
        return[];
    }
    return historicoObjeto;
}

function salvarHistorico(conversao) {
    let historico = recuperarHistorico();
    historico.push(conversao);
    localStorage.setItem("historico", JSON.stringify(historico))
}

function limpar() {
    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = "";

    let valorEntrada = document.getElementById("valorEntrada")
    valorEntrada.value = "";

    document.getElementById("moeda1").value = "start"
    document.getElementById("moeda2").value = "end"
    
}

function inverter() {
    let valorMoeda1 = document.getElementById("moeda1").value;
    let valorMoeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = valorMoeda2;
    document.getElementById("moeda2").value = valorMoeda1;
}