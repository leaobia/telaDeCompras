/**************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de produtos
 * Data: 12/08/2024
 * Autor: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js');

// Retorna todos os produtos.
const getProducts = async function () {
    let dadosProdutoJson = {};
    
    let produtoDAO = require('../model/dao/productsDAO.js');
    let dadosProduto = await produtoDAO.selectAllProducts();

    if (dadosProduto) {
        dadosProdutoJson.status = message.SUCCESS_REQUEST.status;
        dadosProdutoJson.message = message.SUCCESS_REQUEST.message;
        dadosProdutoJson.quantidade = dadosProduto.length;
        dadosProdutoJson.produtos = dadosProduto;
        return dadosProdutoJson;
    } else {
        return message.ERROR_REGISTER_NOT_FOUND;
    }
}

// Retorna produto pela referencia.
const getProductByReference = async function (reference) {

    let dadosProdutoJson = {};
    
    let produtoDAO = require('../model/dao/productsDAO.js');
    let dadosProduto = await produtoDAO.selectProductsByReference(reference);

    if (
        reference == "" || reference == null || reference == undefined 
    ) {
        return message.ERROR_REQUIRE_FIELDS;
    }else{
        if (dadosProduto) {
            dadosProdutoJson.status = message.SUCCESS_REQUEST.status;
            dadosProdutoJson.message = message.SUCCESS_REQUEST.message;
            dadosProdutoJson.quantidade = dadosProduto.length;
            dadosProdutoJson.produtos = dadosProduto;
            return dadosProdutoJson;
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
}

module.exports = {
    getProducts,
    getProductByReference
}