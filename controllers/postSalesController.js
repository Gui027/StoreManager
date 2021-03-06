const Services = require('../services/Services');

const postSalesController = async (req, res) => {
    try {
        const sales = req.body;

        const postSales = await Services.postSalesService(sales);
    
        return res.status(201).json(postSales);
    } catch (error) {
        console.log(error);
        return res.status(500).json('error');
    }
};

module.exports = postSalesController;