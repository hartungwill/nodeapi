const usuarioBLL = require('../bll/usuarios')
const middlewareAuth = require('../config/middleware-auth');
const passport = require('passport');

module.exports = app => {
    app
    .route('/usuarios')
    .get(
        //passport.authenticate('bearer', { session: false }),
        middlewareAuth.bearer,
        (req, res) => {
            console.log('passo Controller INI')
            usuarioBLL.lista(res)
        }
    ) 

    app
    .route('/usuarios/:id')
    .get(
        middlewareAuth.bearer,
        (req, res) => {
            const id = parseInt(req.params.id)

            usuarioBLL.buscaPorId(id, res)
        }
    )

    app
    .route('/usuarios')
    .post(
        middlewareAuth.bearer,
        (req, res) => {
            const usuario = req.body
        
            usuarioBLL.adiciona(usuario, res)
        }
    )

    app
    .route('/usuarios/:id')
    .patch(
        middlewareAuth.bearer,
        (req, res) => {
            const id = parseInt(req.params.id)
            const valores = req.body

            usuarioBLL.altera(id, valores, res)
        }
    )

    app
    .route('/usuarios/:id')
    .delete(
        middlewareAuth.bearer,
        (req, res) => {
            const id = parseInt(req.params.id)

            usuarioBLL.deleta(id, res)
        }
    )
}