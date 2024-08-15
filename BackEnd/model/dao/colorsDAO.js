/**************************************************************************************
 * Objetivo: Responsável pela manipulação de dados das cores do produto no Banco de Dados.
 * Data: 15/08/2024
 * Autora: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/

// Retorna as cores pelo id do produto
const selectColorsByIdProduto = async function (id) {

    let { PrismaClient } = require('@prisma/client');
    let prisma = new PrismaClient();
    let sql = `SELECT * FROM colors where product_id = ${id};`;

    let rsColors = await prisma.$queryRawUnsafe(sql);

    if (rsColors.length > 0) {
        return rsColors;
    } else {
        return false;
    }
}

module.exports = {
    selectColorsByIdProduto
}