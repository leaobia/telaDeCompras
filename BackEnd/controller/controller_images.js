/**************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de imagens
 * Data: 14/08/2024
 * Autor: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js');

// Retorna as imagens pelo id do produto
const getImageByIdProduto= async (id) => {
    if (
        id == "" || id == null || id == undefined || isNaN(id)
    ) {
        return message.ERROR_REQUIRE_FIELDS;
    } else {
        let dadosImageJson = {};
    
        let imagesDAO = require('../model/dao/imagesDAO.js');
        let dadosImages = await imagesDAO.selectImagesByIdProduto(id);
        if (dadosImages) {
            dadosImageJson.status = message.SUCCESS_REQUEST.status;
            dadosImageJson.message = message.SUCCESS_REQUEST.message;
            dadosImageJson.quantidade = dadosImages.length;
            dadosImageJson.images = dadosImages;
            return dadosImageJson;
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
};

module.exports = {
    getImageByIdProduto
}