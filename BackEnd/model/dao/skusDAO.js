/**************************************************************************************
 * Objetivo: Responsável pela manipulação de dados do estoque no Banco de Dados.
 * Data: 14/08/2024
 * Autora: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/

// Retorna o estoque pelo id do produto
const selectSkusByIdProduto = async function (id) {

    let { PrismaClient } = require('@prisma/client');
    let prisma = new PrismaClient();
    let sql = `SELECT * FROM skus where product_id = ${id};`;

    let rsSkus = await prisma.$queryRawUnsafe(sql);

    if (rsSkus.length > 0) {
        return rsSkus;
    } else {
        return false;
    }
}

module.exports = {
    selectSkusByIdProduto
}