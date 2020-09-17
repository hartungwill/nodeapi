const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

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

    return app
}