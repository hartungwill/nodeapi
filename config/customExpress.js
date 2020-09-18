const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
// const { estrategiasAutenticacao } = require('./estrategias-autenticacao');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken')

const Usuario = require('../bll/usuarios');

module.exports = () => {
    // instância do express
    const app = express()
    
    // config tipos aceitos pelo body-parser (permite leitura de body dp form)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // config do consign (helper de rotas)
    consign()
    .include('controllers')
    .into(app)

    passport.use(
        new LocalStrategy (
          {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
          },
          async (email, senha, done) => {
            try {
              Usuario.buscaPorEmail(email)
              .then( (usuario) => {
                verificaUsuario(usuario);
                verificaSenha(senha, usuario.senha);
                
                done(null, usuario);
              });
              
            } catch (erro) {
              done(erro);
            }
          }
        )
      );

    passport.use(
        new BearerStrategy(
            async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT)
                const usuario = await Usuario.buscaPorIdAsync(payload.id)
                done(null, usuario)
            } catch (erro) {
                done(erro)
            }
        })
    )

    return app
}

// Helpers (migrar)
function verificaUsuario(usuario) {
    if (!usuario) {
      throw new Error('Não existe usuário com esse e-mail!');
    }
  }
  
  async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
      throw new Error('E-mail ou senha inválidos!');
    }
  }