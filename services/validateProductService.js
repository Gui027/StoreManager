const { getByIdProducts } = require('./getProductsService');

const validateProduct = async (sale) => {
    const products = await getByIdProducts();

    if (products.quantity <= sale.quantity) {
        return {
            code: 422,
            message: 'Such amount is not permitted to sell',
        };
    }
    return products;
};

module.exports = validateProduct;