const customExpress = require('./config/customExpress')
const conexao = require('./dao/conexao')
const Tabelas = require('./dao/tabelas')

// Conecta com o banco
conexao.connect( erro => {
    if (erro) {
        console.log(erro)
    } else { //Se conseguiu conectar ao Banco, sobe o servidor
        console.log('conectado ao BD')
        
        // Cria tabela se não existir
        Tabelas.init(conexao)
        console.log('Tabela INIT')

        const app = customExpress()
        const porta = 3000

        //Inicia servidor
        app.listen(porta, () => console.log(`Servidor rodando na porta: http://localhost:${porta}`))
    }
})
