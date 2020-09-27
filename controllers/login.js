// const usuarioBLL = require('../bll/usuarios')
// const passport = require('passport');
const jwt = require('jsonwebtoken')
const middlewareAuth = require('../config/middleware-auth');

function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT)
    return token
}

module.exports = app => {
    
    app
    .route('/login')
    .post( 
    middlewareAuth.local,
    (req, res) => {
        try {            
            const token = criaTokenJWT(req.user)            
            res.set('Authorization', token)            
            res.status(204).send();
        } catch (erro) {
            res.status(500).send(erro);
        }
    })
}