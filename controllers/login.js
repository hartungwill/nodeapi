// const usuarioBLL = require('../bll/usuarios')
const passport = require('passport');
const jwt = require('jsonwebtoken')

function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT)
    return token
}

module.exports = app => {

    // app.post('/login', (req, res) => {
    //     const usuario = req.body
        
    //     // usuarioBLL.adiciona(usuario, res)
    // })

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
    })

    // app.post('/login', 
    // passport.authenticate('local', { session: false }),
    // (req, res) => {
    //     res.status(204).send();
    // })

    // app
    // .route('/usuario/login')
    // .post(
    //   passport.authenticate('local', { session: false }),
    //   usuariosControlador.login
    // );

}