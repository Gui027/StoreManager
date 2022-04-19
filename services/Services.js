const deleteProductService = require('./deleteProductService');
const deleteSalesService = require('./deleteSalesService');
const { getAllProducts, getByIdProducts } = require('./getProductsService');
const { getAllSales, getSalesById } = require('./getSalesServices');
const postProductService = require('./postProductService');
const postSalesService = require('./postSalesService');
const putProductsService = require('./putProductsService');
const putSalesService = require('./putSalesService');
const validateProduct = require('./validateProductService');

module.exports = {
    deleteProductService,
    deleteSalesService,
    getAllProducts,
    getByIdProducts,
    getAllSales,
    getSalesById,
    postProductService,
    postSalesService,
    putProductsService,
    putSalesService,
    validateProduct,
};