/*************************************************************************************
 * Objetivo: Rota para retornar dados de cores do sistema de catálogo
 * Autora: Bianca Leão
 * Data: 15/08/2024
 * Versão: 1.0
 *************************************************************************************/

const express = require('express');
const router = express.Router();

const controllerColors = require('../controller/controller_colors.js');
const message = require('../controller/modulo/config.js');

router.get('/colors/:id', async (req, res) => {
    try {
        let idCor = parseInt(req.params.id);
        let dadosCores = await controllerColors.getColorsByIdProduto(idCor);

        if (dadosCores) {
            res.status(dadosCores.status).json(dadosCores);
        } else {
            res.status(message.ERROR_INVALID_CONTENT_TYPE.status).json(message.ERROR_INVALID_CONTENT_TYPE.message);
        }
    } catch (error) {
        res.status(message.ERROR_INTERNAL_SYSTEM.status).json(message.ERROR_INTERNAL_SYSTEM.message);
    }
});

module.exports = router;