const AtendimentoBLL = require('../bll/atendimentos')
const middlewareAuth = require('../config/middleware-auth');

module.exports = app => {
    app
    .route('/atendimentos')
    .get(
        middlewareAuth.bearer,
        (req, res) => {
            AtendimentoBLL.lista(res)
        }
    ) 

    app
    .route('/atendimentos/:id')
    .get(
        middlewareAuth.bearer, 
        (req, res) => {
            const id = parseInt(req.params.id)

            AtendimentoBLL.buscaPorId(id, res)
        }
    )

    app
    .route('/atendimentos')
    .post(
        middlewareAuth.bearer,
        (req, res) => {
            const atendimento = req.body
        
            AtendimentoBLL.adiciona(atendimento, res)
        }
    )

    app
    .route('/atendimentos/:id')
    .patch(
        middlewareAuth.bearer,
        (req, res) => {
            const id = parseInt(req.params.id)
            const valores = req.body

            AtendimentoBLL.altera(id, valores, res)
        }
    )

    app
    .route('/atendimentos/:id')
    .delete(
        middlewareAuth.bearer,
        (req, res) => {
            const id = parseInt(req.params.id)

            AtendimentoBLL.deleta(id, res)
        }
    )
}