/*************************************************************************************
 * Objetivo: Rota para retornar dados de estoque do sistema de catálogo
 * Autora: Bianca Leão
 * Data: 15/08/2024
 * Versão: 1.0
 *************************************************************************************/

const express = require('express');
const router = express.Router();

const controllerSkus = require('../controller/controller_skus.js');
const message = require('../controller/modulo/config.js');

router.get('/skus/:id', async (req, res) => {
    try {
        let idSkus = parseInt(req.params.id);
        let dadosSkus = await controllerSkus.getSkusByIdProduto(idSkus);

        if (dadosSkus) {
            res.status(dadosSkus.status).json(dadosSkus);
        } else {
            res.status(message.ERROR_INVALID_CONTENT_TYPE.status).json(message.ERROR_INVALID_CONTENT_TYPE.message);
        }
    } catch (error) {
        res.status(message.ERROR_INTERNAL_SYSTEM.status).json(message.ERROR_INTERNAL_SYSTEM.message);
    }
});

module.exports = router;