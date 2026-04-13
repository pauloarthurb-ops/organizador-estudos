const { adicionarTarefa, listarTarefas, concluirTarefa, limparTarefas } = require('../src/gerenciador');

describe('Testes do Gerenciador de Estudos', () => {
    beforeEach(() => {
        limparTarefas(); // Limpa as tarefas antes de cada teste para não dar conflito
    });

    // 1. Cenário de uso correto ("caminho feliz")
    test('Deve adicionar uma tarefa corretamente', () => {
        const tarefa = adicionarTarefa('Estudar Matemática', 30);
        expect(tarefa.nome).toBe('Estudar Matemática');
        expect(tarefa.tempoEstimado).toBe(30);
        expect(listarTarefas().length).toBe(1);
    });

    // 2. Entrada inválida ou comportamento indevido
    test('Deve impedir a criação de tarefa com tempo negativo ou zero', () => {
        expect(() => {
            adicionarTarefa('Estudar História', -10);
        }).toThrow("O tempo estimado deve ser maior que zero.");
    });

    // 3. Caso limite / Variação importante
    test('Deve gerar erro ao tentar concluir uma tarefa que não existe', () => {
        expect(() => {
            concluirTarefa(999); // ID inexistente
        }).toThrow("Tarefa não encontrada.");
    });
});