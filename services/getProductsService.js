const ProductModel = require('../models/ProductModel');

const getAllProducts = async () => {
    const products = await ProductModel.getAll();
    return products;
};

const getByIdProducts = async (id) => {
    const products = await ProductModel.getAll();
    const product = products.find((p) => p.id === Number(id));

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