const ProductModel = require('../models/ProductModel');

const validateName = async (name) => {
    const products = await ProductModel.getAll();

    return products.filter((p) => p.name === name);
};

const alreadyExist = async (name, quantity) => {
    const productName = await validateName(name);

    if (productName.length >= 1) {
        return {
            code: 409,
            message: 'Product already exists',
        };
    }

    const product = await ProductModel.createProduct(name, quantity);
    return product;
};

module.exports = alreadyExist;