const validateProductService = require('../services/validateProductService');

const validateProduct = async (req, res) => {
    const { id, quantity } = req.body;

    const stock = await validateProductService(id, quantity);

    if (stock.message) {
        return res.status(stock.code).json({ message: stock.message });
    }
};

module.exports = validateProduct;