const passport = require('passport');

const usuarioBLL = require('../bll/usuarios')

module.exports = app => {
    app.get('/usuarios', (req, res) => {
        usuarioBLL.lista(res)
    }) 

    app.get('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)

        usuarioBLL.buscaPorId(id, res)
    })

    app.post('/usuarios', (req, res) => {
        const usuario = req.body
        
        usuarioBLL.adiciona(usuario, res)
    })

    app.patch('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        usuarioBLL.altera(id, valores, res)
    })

    app.delete('/usuarios/:id', 
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        const id = parseInt(req.params.id)

        usuarioBLL.deleta(id, res)
    })

/*
    app.post('/login', 
    passport.authenticate('local', { session: false }),
    function(req, res) {
        try {
            const token = criaTokenJWT(req.user)
            res.set('Authorization', token)
            res.status(204).send();
        } catch (erro) {
            res.status(500).send(erro);
        }
    });*/
    
}