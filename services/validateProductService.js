// const { getById } = require('../models/ProductModel');
// const SalesModel = require('../models/SalesModel');
const products = require('../models/ProductModel');

const validateProduct = async (item) => {
    console.log('validateProductService', item);
    const reqProducts = await products.getById({ id: item.productId });
    const count = Number(reqProducts.quantity) - Number(item.quantity);
    console.log('reqProducts', reqProducts);
    console.log('reqProducts.quantity', reqProducts.quantity);
    console.log('item.quantity', item.quantity);

    if (reqProducts === 'notFound') return 'notFound';
    console.log('count', count);
    if (count < 0) {
        return {
            code: 422,
            message: 'Such amount is not permitted to sell',
        };
    }
    return reqProducts;
};

module.exports = validateProduct;