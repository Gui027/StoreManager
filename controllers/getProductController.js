const { getProductService } = require('../services/Services');

const getAll = async (req, res) => {
    const product = await getProductService.getAllProducts();
    return res.status(200).json(product);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await getProductService.getByIdProducts(id);
    if (product.message) {
        return res.status(product.code).json({ message: product.message });
    }

    return res.status(200).json(product);
};

module.exports = {
    getAll,
    getById,
};