const validateProductService = require('../services/validateProductService');

const postProduct = async (req, res) => {
    const { sale } = req.body;

    const product = await validateProductService.validateProduct(sale);

    if (product.message) {
        return res.status(product.code).json({ message: product.message });
    }

    return res.status(201).json(product);
};

module.exports = postProduct;