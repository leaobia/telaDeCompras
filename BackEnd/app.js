/*************************************************************************************
 * Objetivo: API para retornar dados de um sistema de catálogo de produtos
 * Autor: Bianca Leão
 * Data: 12/08/2024
 * Versão: 1.0
 *************************************************************************************/

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

var message = require('./controller/modulo/config.js')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

// Endpoint: Retorna todos os dados da tabela products
app.get('/v1/eCatalogos/produtos', cors(), async function (request, response) {
    let controllerProdutos = require('./controller/controller_products.js');
    let dadosProdutos = await controllerProdutos.getProducts();
    if (dadosProdutos) {
        response.json(dadosProdutos);
        response.status(dadosProdutos.status);
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});