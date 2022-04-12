const { createSalesModel } = require('../models/SalesModel');

const postSalesService = async (sales) => {
    const createSale = await createSalesModel(sales);

    return createSale;
};

module.exports = postSalesService;