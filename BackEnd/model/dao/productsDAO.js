/**************************************************************************************
 * Objetivo: Responsável pela manipulação de dados das cartas no Banco de Dados.
 * Data: 12/08/2024
 * Autor: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/

// Retorna todos os produtos
const selectAllProducts = async function () {

    let { PrismaClient } = require('@prisma/client');
    let prisma = new PrismaClient();
    let sql = `SELECT * FROM products;`;

    let rsProducts = await prisma.$queryRawUnsafe(sql);

    if (rsProducts.length > 0) {
        return rsProducts;
    } else {
        return false;
    }
}

module.exports = {
    selectAllProducts
}