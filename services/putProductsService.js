const { putProduct } = require('../models/ProductModel');
const { getByIdProducts } = require('./getProductsService');

const updateProductService = async (id, name, quantity) => {
    const product = await getByIdProducts(id);

    if (product.message) {
        return product;
    }

    const updateProduct = await putProduct(id, name, quantity);
    return updateProduct;
};

module.exports = updateProductService;