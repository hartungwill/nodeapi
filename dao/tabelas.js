class Tabelas {

    init(conexao){
        this.conexao = conexao

        this._usuariosTable = `
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          nome VARCHAR(40) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          senha VARCHAR(255) NOT NULL
        )
        `;

        this._atendimentosTable = `
        CREATE TABLE IF NOT EXISTS Atendimentos (
            id int NOT NULL AUTO_INCREMENT, 
            cliente varchar(50) NOT NULL, 
            pet varchar(20), 
            servico varchar(20) NOT NULL, 
            status varchar(20) NOT NULL, 
            observacoes text, 
            PRIMARY KEY(id)
        )        
        `;

        this.criarAtendimentos()
        this.criarUsuarios()
    }

    criarAtendimentos() {
        const sql = this._atendimentosTable

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos OK')
            }
        })
    }

    criarUsuarios() {
        const sql = this._usuariosTable

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Usuários OK')
            }
        })
    }
}
module.exports = new Tabelas