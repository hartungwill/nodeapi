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
}