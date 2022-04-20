const Services = require('../services/Services');

const getAll = async (req, res) => {
    const product = await Services.getAllProducts();
    return res.status(200).json(product);
};

const getById = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const product = await Services.getByIdProducts(id);
        if (product.message) {
            return res.status(product.code).json({ message: product.message });
        }

        return res.status(200).json(product);
    }
};

module.exports = {
    getAll,
    getById,
};