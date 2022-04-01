const ProductsModel = require('../models/ProductModel');

const getAll = async () => {
    const products = await ProductsModel.getAll();
    return products;
};

module.exports = {
    getAll,
};