const AtendimentoBLL = require('../bll/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        AtendimentoBLL.lista(res)
    }) 

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        AtendimentoBLL.buscaPorId(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        
        AtendimentoBLL.adiciona(atendimento, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        AtendimentoBLL.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        AtendimentoBLL.deleta(id, res)
    })
}