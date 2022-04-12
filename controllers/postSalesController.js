const postSalesService = require('../services/postSalesService');

const postSalesController = async (req, res) => {
    const sales = req.body;

    const postSales = await postSalesService(sales);

    return res.status(201).json(postSales);
};

module.exports = postSalesController;