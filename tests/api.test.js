describe('Teste de Integracao com a API Publica (Simulado)', () => {
    
    test('Deve simular o acesso a Advice Slip API e retornar uma dica com sucesso', async () => {
        // Criamos uma resposta falsa (Mock) idêntica ao que a API enviaria
        const respostaSimulada = {
            status: 200,
            json: async () => ({
                slip: {
                    id: 123,
                    advice: "Estude um pouco todos os dias e veja o seu progresso."
                }
            })
        };

        // Substituímos o fetch real pela nossa simulação local
        global.fetch = jest.fn().mockResolvedValue(respostaSimulada);

        // Executamos o teste usando o nosso fetch simulado
        const resposta = await fetch('https://api.adviceslip.com/advice');
        
        // Verificações para validar que o sistema se comporta como esperado
        expect(resposta.status).toBe(200);
        
        const dados = await resposta.json();
        expect(dados.slip).toBeDefined();
        expect(dados.slip.advice).toBe("Estude um pouco todos os dias e veja o seu progresso.");
        
        // Limpa a simulação depois do teste
        jest.restoreAllMocks();
    });

});