require('dotenv').config
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const rota_produto = require('./rotas/rotas-produtos')
const rota_cliente = require('./rotas/rotas-cliente')
const rota_auth = require('./rotas/rotas-autenticacao')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

//CAMINHO PARA O ARQUIVO YAML
const swaggerDocument = YAML.load('./docs/documentacao.yaml')

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/produtos', rota_produto)
app.use('/clientes', rota_cliente)
app.use('/auth', rota_auth)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});

module.exports = app;