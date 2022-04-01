const ProductsService = require('../services/ProductsService');

const getAll = async (req, res) => {
    const product = await ProductsService.getAll();
    res.status(200).json(product);
};

module.exports = {
    getAll,
};