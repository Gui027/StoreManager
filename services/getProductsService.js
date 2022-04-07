const ProductsModel = require('../models/ProductModel');

const getAllProducts = async () => {
    const products = await ProductsModel.getAll();
    // console.log(products);
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

    console.log(products, id);

    return product;
};

module.exports = {
    getAllProducts,
    getByIdProducts,
};