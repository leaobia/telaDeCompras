/**************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de estoque
 * Data: 14/08/2024
 * Autora: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js');

// Retorna o estoque pelo id do produto
const getSkusByIdProduto = async (id) => {
    if (id == "" || id == null || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRE_FIELDS;
    } else {
        let dadosSkusJson = {};

        let skusDAO = require('../model/dao/skusDAO.js');
        let dadosSkus = await skusDAO.selectSkusByIdProduto(id);

        if (dadosSkus) {

            for (let i = 0; i < dadosSkus.length; i++) {
                dadosSkus[i].stock = parseInt(dadosSkus[i].stock);
            }

            dadosSkusJson.status = message.SUCCESS_REQUEST.status;
            dadosSkusJson.message = message.SUCCESS_REQUEST.message;
            dadosSkusJson.quantidade = dadosSkus.length;
            dadosSkusJson.skus = dadosSkus;

            return dadosSkusJson;
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
};


module.exports = {
    getSkusByIdProduto
}