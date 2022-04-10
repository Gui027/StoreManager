const ProductsModel = require('../models/ProductModel');

const getAllProducts = async () => {
    const products = await ProductsModel.getAll();
    return products;
};

const getByIdProducts = async (id) => {
    const products = await ProductsModel.getAll();
    const product = products.find((p) => p.id === parseInt(id, 10));

    if (!product) {
        return {
            code: 404,
            message: 'Product not found',
        };
    }

    return product;
};

module.exports = {
    getAllProducts,
    getByIdProducts,
};