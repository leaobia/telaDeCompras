/**************************************************************************************
 * Objetivo: Responsável pela manipulação de dados das imagens no Banco de Dados.
 * Data: 14/08/2024
 * Autor: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/

// Retorna as imagens pelo id do produto
const selectImagesByIdProduto = async function (id) {

    let { PrismaClient } = require('@prisma/client');
    let prisma = new PrismaClient();
    let sql = `SELECT * FROM images where product_id = ${id};`;

    let rsImg = await prisma.$queryRawUnsafe(sql);

    if (rsImg.length > 0) {
        return rsImg;
    } else {
        return false;
    }
}

module.exports = {
    selectImagesByIdProduto
}