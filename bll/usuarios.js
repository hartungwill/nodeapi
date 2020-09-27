const conexao = require('../dao/conexao')
const bcrypt = require('bcrypt');
const custoHash = 12

class UsuariosBll {

    
    async adiciona(usuario, res) {
        
        gerarSenhaHash(usuario.senha).then(function(senhaHash) {
            usuario.senha = senhaHash
    
            const sql = 'INSERT INTO usuarios SET ?'
            
            conexao.query(sql, usuario, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json(usuario)
                }
            })
          })
    }

    lista(res) {
        console.log('bll')
        const sql = 'SELECT * FROM usuarios'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM usuarios WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const usuario = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else if (!usuario) {
                res.status(204).json()
            } else {
                res.status(200).json(usuario)
            }
        })
    }

    buscaPorIdAsync(id) {
        return new Promise( (resolve,reject) => {
            const sql = `SELECT * FROM usuarios WHERE id=${id}`

            conexao.query(sql, (erro, resultados) => {
                const usuario = resultados[0]
                if (erro) {
                    reject(erro)
                } else {
                    resolve(usuario)
                }
            })
        })
    }

    altera(id, valores, res) {
        
        gerarSenhaHash(valores.senha).then(function(senhaHash) {
            valores.senha = senhaHash
    
            const sql = 'UPDATE usuarios SET ? WHERE id=?'
            
            conexao.query(sql, [valores, id], (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json({...valores, id})
                }
            })
          })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM usuarios WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }

    async buscaPorEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM usuarios WHERE email="${email}"`
    
            conexao.query(sql, (erro, resultados) => {
                const usuario = resultados[0]
                
                if (erro) {
                    reject(erro)
                } else {
                    resolve(usuario)
                }
            })
        })
    }
}

function gerarSenhaHash(senha) {
    return new Promise( function (resolve, reject) {        
        bcrypt.hash(senha, custoHash).then((senhaHash) => {
            resolve(senhaHash)
        });
     });
}

module.exports = new UsuariosBll