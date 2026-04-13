let tarefas = [];

function adicionarTarefa(nome, tempoEstimado) {
    if (!nome || nome.trim() === '') {
        throw new Error("O nome da tarefa não pode estar vazio.");
    }
    if (tempoEstimado <= 0) {
        throw new Error("O tempo estimado deve ser maior que zero.");
    }
    
    const novaTarefa = {
        id: tarefas.length + 1,
        nome,
        tempoEstimado,
        concluida: false
    };
    
    tarefas.push(novaTarefa);
    return novaTarefa;
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }
    tarefa.concluida = true;
    return tarefa;
}

function limparTarefas() {
    tarefas = []; // Útil para limpar o estado entre os testes
}

module.exports = { adicionarTarefa, listarTarefas, concluirTarefa, limparTarefas };