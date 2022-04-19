const deleteProductController = require('./deleteProductController');
const deleteSaleController = require('./deleteSaleController');
const { getAll, getById } = require('./getProductController');
const { getAllS, getByIdS } = require('./getSalesController');
const postProductsController = require('./postProductsController');
const postSalesController = require('./postSalesController');
const putProductsController = require('./putProductsController');
const updateSalesController = require('./updateSalesController');
const validateProductController = require('./validateProductController');

module.exports = {
    deleteProductController,
    deleteSaleController,
    getAll, 
    getById,
    getAllS,
    getByIdS,
    postProductsController,
    postSalesController,
    putProductsController,
    updateSalesController,
    validateProductController,
};