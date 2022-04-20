const ProductsModel = require('../models/ProductModel');

const getAllProducts = async () => {
    const products = await ProductsModel.getAll();
    return products;
};

const getByIdProducts = async (id) => {
    console.log('id é valido?', id);
    const product = await ProductsModel.getById({ id });

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