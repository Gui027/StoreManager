const { postSalesService } = require('../services/Services');

const postSalesController = async (req, res) => {
    try {
        const sales = req.body;
        console.log('sales', sales);
        const postSales = await postSalesService(sales);
    
        return res.status(201).json(postSales);
    } catch (error) {
        console.log(error);
        return res.status(500).json('error');
    }
};

module.exports = postSalesController;