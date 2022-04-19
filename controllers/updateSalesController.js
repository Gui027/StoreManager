const { putSalesService } = require('../services/Services');

const updateSales = async (req, res) => {
    const { id } = req.params;
    const [product] = req.body;

    const sale = await putSalesService(id, product);

    return res.status(200).json(sale);
};

module.exports = updateSales;