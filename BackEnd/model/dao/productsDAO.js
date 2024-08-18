/**************************************************************************************
 * Objetivo: Responsável pela manipulação de dados dos produtos no Banco de Dados.
 * Data: 12/08/2024
 * Autor: Bianca Leão
 * Versão: 1.0
 **************************************************************************************/
var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

// Retorna todos os produtos
const selectAllProducts = async function () {

    let sql = `SELECT * FROM products;`;

    let rsProducts = await prisma.$queryRawUnsafe(sql);

    if (rsProducts.length > 0) {
        return rsProducts;
    } else {
        return false;
    }
}

// Retorna produtos pela referencia
const selectProductsByReference = async function (reference) {

    let sql = `SELECT * FROM products where reference = '${reference}'`;

    let rsProducts = await prisma.$queryRawUnsafe(sql);

    if (rsProducts.length > 0) {
        return rsProducts;
    } else {
        return false;
    }
}

// Retorna produtos pela categoria
const selectProductsByCategory = async function (category) {

    let sql = `SELECT * FROM products where category = '${category}'`;
    
    let rsProducts = await prisma.$queryRawUnsafe(sql);

    if (rsProducts.length > 0) {
        return rsProducts;
    } else {
        return false;
    }
}

module.exports = {
    selectAllProducts,
    selectProductsByReference,
    selectProductsByCategory
}