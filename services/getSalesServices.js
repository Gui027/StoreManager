const { getAllSalesModel } = require('../models/SalesModel');

const getAllSales = async () => {
    const sales = await getAllSalesModel();
    return sales;
};

const getSalesById = async (id) => {
    const sales = await getAllSalesModel(id);

    if (!sales.length) {
        return {
            code: 404,
            message: 'Sale not found',
        };
    }

    return sales;
};

module.exports = {
    getAllSales,
    getSalesById,
};