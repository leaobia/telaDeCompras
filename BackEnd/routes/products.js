/*************************************************************************************
 * Objetivo: Rota para retornar dados de produtos do sistema de catálogo
 * Autora: Bianca Leão
 * Data: 15/08/2024
 * Versão: 1.0
 *************************************************************************************/

const express = require('express');
const router = express.Router();

const controllerProdutos = require('../controller/controller_products.js');
const message = require('../controller/modulo/config.js');

router.get('/produtos', async (req, res) => {
    let dadosProdutos = await controllerProdutos.getProducts();
    console.log("produtos");
    if (dadosProdutos) {
        res.status(dadosProdutos.status).json(dadosProdutos);
    } else {
        res.status(message.ERROR_INVALID_CONTENT_TYPE.status).json(message.ERROR_INVALID_CONTENT_TYPE.message);
    }
});

router.get('/produtos/categoria/:category', async (req, res) => {
    try {
        let category = req.params.category
        let dadosProdutos = await controllerProdutos.getProductByCategory(category);
    
        if (dadosProdutos) {
            res.status(dadosProdutos.status).json(dadosProdutos);
        } else {
            res.status(message.ERROR_INVALID_CONTENT_TYPE.status).json(message.ERROR_INVALID_CONTENT_TYPE.message);
        }
    } catch (error) {
        res.status(message.ERROR_INTERNAL_SYSTEM.status).json(message.ERROR_INTERNAL_SYSTEM.message);
    }
});

router.get('/produtos/:reference', async (req, res) => {
    try {
        let referencia = req.params.reference
        let dadosProdutos = await controllerProdutos.getProductByReference(referencia);
    
        if (dadosProdutos) {
            res.status(dadosProdutos.status).json(dadosProdutos);
        } else {
            res.status(message.ERROR_INVALID_CONTENT_TYPE.status).json(message.ERROR_INVALID_CONTENT_TYPE.message);
        }
    } catch (error) {
        res.status(message.ERROR_INTERNAL_SYSTEM.status).json(message.ERROR_INTERNAL_SYSTEM.message);
    }
});

module.exports = router;