const readline = require('readline-sync');
const { adicionarTarefa, listarTarefas, concluirTarefa } = require('./gerenciador');

// =========================================================================
// NOVO: Função que consome a API pública para buscar a dica de motivação
// =========================================================================
async function obterDicaDoDia() {
    try {
        const resposta = await fetch('https://api.adviceslip.com/advice');
        const dados = await resposta.json();
        const dica = dados.slip.advice;
        
        console.log("\n==================================================");
        console.log("💡 DICA DO DIA PARA OS SEUS ESTUDOS (API):");
        console.log(`> ${dica}`);
        console.log("==================================================");
    } catch (erro) {
        // Frase de segurança caso o computador esteja sem internet
        console.log("\n💡 Dica do dia: Mantenha o foco e organize o seu tempo!\n");
    }
}

// =========================================================================
// SEU CÓDIGO ANTIGO: Mantido exatamente igual, sem alterações na lógica
// =========================================================================
function menu() {
    console.log("\n=== 🧠 Organizador de Estudos Focado ===");
    console.log("1. Adicionar nova microtarefa de estudo");
    console.log("2. Listar tarefas");
    console.log("3. Concluir tarefa");
    console.log("4. Sair");
    
    const opcao = readline.question("Escolha uma opcao: ");
    
    try {
        switch(opcao) {
            case '1':
                const nome = readline.question("O que voce precisa estudar agora? ");
                const tempo = parseInt(readline.question("Tempo estimado (em minutos, ex: 25): "));
                adicionarTarefa(nome, tempo);
                console.log("✅ Tarefa adicionada com sucesso! Um passo de cada vez.");
                break;
            case '2':
                const lista = listarTarefas();
                if (lista.length === 0) console.log("Nenhuma tarefa cadastrada no momento.");
                lista.forEach(t => {
                    const status = t.concluida ? "[X]" : "[ ]";
                    console.log(`${status} ID: ${t.id} - ${t.nome} (${t.tempoEstimado} min)`);
                });
                break;
            case '3':
                const id = parseInt(readline.question("Digite o ID da tarefa concluida: "));
                concluirTarefa(id);
                console.log("🎉 Parabens por concluir mais uma etapa! Recompense-se.");
                break;
            case '4':
                console.log("Ate logo! Mantenha o foco.");
                process.exit(0);
            default:
                console.log("Opcao invalida. Tente novamente.");
        }
    } catch (erro) {
        console.error(`❌ Erro: ${erro.message}`);
    }
    
    menu(); // Chama o menu novamente para criar um loop
}

// =========================================================================
// NOVO: Fluxo de inicialização que aguarda a API antes de abrir o menu
// =========================================================================
async function iniciar() {
    await obterDicaDoDia(); // Busca a dica na internet primeiro
    menu();                 // Abre o seu menu logo em seguida
}

iniciar(); // Executa o programa completo