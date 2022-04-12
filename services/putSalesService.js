const { updateSalesModel } = require('../models/SalesModel');

const updateSalesService = async (id, product) => {
    const { product_id: productId, quantity } = product;
    await updateSalesModel(id, productId, quantity);

    return {
        saleId: id,
        itemUpdated: [product],
    };
};

module.exports = updateSalesService;