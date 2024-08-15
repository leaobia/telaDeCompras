/*************************************************************************************
 * Objetivo: API para retornar dados de um sistema de catálogo de produtos
 * Autora: Bianca Leão
 * Data: 12/08/2024
 * Versão: 1.0
 *************************************************************************************/

const express = require('express');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

const productsRoutes = require('./routes/products');
const imagesRoutes = require('./routes/images');
const skusRoutes = require('./routes/skus');
const colorsRoutes = require('./routes/colors');

app.use('/v1/eCatalogos', productsRoutes);
app.use('/v1/eCatalogos', imagesRoutes);
app.use('/v1/eCatalogos', skusRoutes);
app.use('/v1/eCatalogos', colorsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});