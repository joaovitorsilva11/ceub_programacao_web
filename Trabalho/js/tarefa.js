let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefa = document.querySelector('#listaTarefa');

// Carregar tarefas do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if(tarefas) {
        tarefas.forEach(tarefa => adicionarTarefa(tarefa));
    }
});

inputNovaTarefa.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId()
        }
        adicionarTarefa(tarefa);
        salvarNoLocalStorage(tarefa);
    }
})

btnAddTarefa.addEventListener('click', (e) => {
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId()
    }
    adicionarTarefa(tarefa);
    salvarNoLocalStorage(tarefa);
})

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
    
    let div = document.createElement('div'); 
    let btnExcluir  = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');
    div.appendChild(btnExcluir);
    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function excluir(idTarefa) {
    let li = document.getElementById(''+ idTarefa + '');
    if(li) {
        listaTarefa.removeChild(li);
        removerDoLocalStorage(idTarefa);
    }
}

function salvarNoLocalStorage(tarefa) {
    let tarefas;
    if(localStorage.getItem('tarefas') === null) {
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
