/**************************************************************************************
 * Objetivo: Responsável pela manipulação de dados dos produtos no Banco de Dados.
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
const selectProductById = async function (idProduto) {

    let { PrismaClient } = require('@prisma/client');
    let prisma = new PrismaClient();

    let sql = `
    SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.reference AS product_reference,
    p.price AS product_price,
    p.description AS product_description,
    p.category AS product_category,
    p.brand AS product_brand,
    p.gender AS product_gender,
    GROUP_CONCAT(DISTINCT cores.name ORDER BY cores.name ASC SEPARATOR ', ') AS color_names,
    GROUP_CONCAT(DISTINCT cores.hex_code ORDER BY cores.name ASC SEPARATOR ', ') AS color_hex_codes,
    GROUP_CONCAT(DISTINCT i.path ORDER BY i.\`order\` ASC SEPARATOR ', ') AS image_paths,
    GROUP_CONCAT(DISTINCT i.\`order\` ORDER BY i.\`order\` ASC SEPARATOR ', ') AS image_orders,
    GROUP_CONCAT(DISTINCT CONCAT(s.size, ':', s.stock) ORDER BY s.size ASC SEPARATOR ', ') AS sizes_stock
    FROM products p
    LEFT JOIN colors cores ON cores.product_id = p.id
    LEFT JOIN images i ON i.product_id = p.id
    LEFT JOIN skus s ON s.product_id = p.id
    WHERE p.id = ${idProduto}
    GROUP BY p.id;
    `;


    let rsProducts = await prisma.$queryRawUnsafe(sql);

    if (rsProducts.length > 0) {
        return rsProducts;
    } else {
        return false;
    }
}

module.exports = {
    selectAllProducts,
    selectProductById
}