/*************************************************************************************
 * Objetivo: Rota para retornar dados de imagem do sistema de catálogo
 * Autora: Bianca Leão
 * Data: 15/08/2024
 * Versão: 1.0
 *************************************************************************************/

const express = require('express');
const router = express.Router();

const controllerImages = require('../controller/controller_images.js');
const message = require('../controller/modulo/config.js');

router.get('/images/:id', async (req, res) => {
    try {
        let idProduto = req.params.id;
        let dadosImage = await controllerImages.getImageByIdProduto(idProduto);

        if (dadosImage) {
            res.status(dadosImage.status).json(dadosImage);
        } else {
            res.status(message.ERROR_INVALID_CONTENT_TYPE.status).json(message.ERROR_INVALID_CONTENT_TYPE.message);
        }
    } catch (error) {
        res.status(message.ERROR_INTERNAL_SYSTEM.status).json(message.ERROR_INTERNAL_SYSTEM.message);
    }
});

module.exports = router;