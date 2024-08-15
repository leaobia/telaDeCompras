/**************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de cores
 * Data: 14/08/2024
 * Autora: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js');

// Retorna as cores pelo id do produto
const getColorsByIdProduto = async (id) => {
    if (id == "" || id == null || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRE_FIELDS;
    } else {
        let dadosColorsJson = {};

        let colorsDAO = require('../model/dao/colorsDAO.js');
        let dadosColors = await colorsDAO.selectColorsByIdProduto(id);

        if (dadosColors) {

            dadosColorsJson.status = message.SUCCESS_REQUEST.status;
            dadosColorsJson.message = message.SUCCESS_REQUEST.message;
            dadosColorsJson.quantidade = dadosColors.length;
            dadosColorsJson.colors = dadosColors;

            return dadosColorsJson;
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
};


module.exports = {
    getColorsByIdProduto
}