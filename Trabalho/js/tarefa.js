let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefa = document.querySelector('#listaTarefa');
let horas = document.getElementById('horas');
let minutos = document.getElementById('minutos');
let segundos = document.getElementById('segundos');


//relogio


const relogio = setInterval(function time() {
    let dataToday = new Date();
    let hr = dataToday.getHours();
    let min = dataToday.getMinutes();
    let s = dataToday.getSeconds();

    if (hr < 10) hr = '0' + hr;
    if (min < 10) min = '0' + min;
    if (s < 10) s = '0' + s;


    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = s;
})


//to-do list


document.addEventListener('DOMContentLoaded', function() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if(tarefas) {
        tarefas.forEach(tarefa => adicionarTarefa(tarefa));
       
    }
});
function adicionarNovaTarefa () {
    let nomeTarefa = inputNovaTarefa.value.trim();
    if (nomeTarefa != '') {
    let dataToday = new Date();
        let dia = dataToday.getDate();
        let mes = dataToday.getMonth() + 1;
        let ano = dataToday.getFullYear();
        let hora = dataToday.getHours();
        let minutos = dataToday.getMinutes();
   
        if (dia < 10) dia = '0' + dia;
        if (mes < 10) mes = '0' + mes;
        if (hora < 10) hora = '0' + hora;
        if (minutos < 10) minutos = '0' + minutos;
   
        let dataHora = `${dia}/${mes}/${ano} ${hora}:${minutos} `;
   
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
            dataHora: dataHora
        };
   
        adicionarTarefa(tarefa);
        salvarNoLocalStorage(tarefa);
        inputNovaTarefa.value = '';
}}


inputNovaTarefa.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        adicionarNovaTarefa();
    }
})


btnAddTarefa.addEventListener('click', adicionarNovaTarefa);


function gerarId() {
    return Math.floor(Math.random() * 3000);
}


function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefa.appendChild(li);  
    inputNovaTarefa.value = '';  
}

function criarTagLI(tarefa) {
    let li = document.createElement('li');
    li.id = tarefa.id;
    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let spanDataHora = document.createElement('span');
    spanDataHora.classList.add('dataHoraTarefa');
    spanDataHora.textContent = tarefa.dataHora; 

    let div = document.createElement('div');
    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir(' + tarefa.id + ')');
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(spanDataHora);
    li.appendChild(div);

    return li;
}



// Função para formatar a data e hora no formato "DD/MM/AAAA HH:MM"
function getDataHoraFormatada(dataHoraTexto) {
    let partes = dataHoraTexto.split(' ');
    let dataPartes = partes[0].split('/');
    let horaPartes = partes[1].split(':');
    let dataHoraFormatada = `${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}T${horaPartes[0]}:${horaPartes[1]}:00`;
    return dataHoraFormatada;
}



function excluir(idTarefa) {
    let li = document.getElementById('' + idTarefa + '');
    if (li) {
        listaTarefa.removeChild(li);
        removerDoLocalStorage(idTarefa);
        excluirUltimoLi();
    }
}

function salvarNoLocalStorage(tarefa) {
    let tarefas;
    if (localStorage.getItem('tarefas') === null) {
        tarefas = [];
    } else {
        tarefas = JSON.parse(localStorage.getItem('tarefas'));
    }
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


function removerDoLocalStorage(idTarefa) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'));
    tarefas = tarefas.filter(tarefa => tarefa.id != idTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

//filtro

document.getElementById('ordemTarefas').addEventListener('change', ordenarTarefasExistente);

function ordenarTarefasExistente() {
    let tarefas = Array.from(listaTarefa.children);

    if (this.value === 'recentes') {
        tarefas.sort(function(a, b) {
            let dataHoraA = new Date(getDataHoraFormatada(a.querySelector('.dataHoraTarefa').textContent));
            let dataHoraB = new Date(getDataHoraFormatada(b.querySelector('.dataHoraTarefa').textContent));
            return dataHoraB - dataHoraA;
        });
    } else if (this.value === 'antigas') {
        tarefas.sort(function(a, b) {
            let dataHoraA = new Date(getDataHoraFormatada(a.querySelector('.dataHoraTarefa').textContent));
            let dataHoraB = new Date(getDataHoraFormatada(b.querySelector('.dataHoraTarefa').textContent));
            return dataHoraA - dataHoraB;
        });
    }

    while (listaTarefa.firstChild) {
        listaTarefa.removeChild(listaTarefa.firstChild);
    }

    tarefas.forEach(function(tarefa) {
        listaTarefa.appendChild(tarefa);
    });
}

