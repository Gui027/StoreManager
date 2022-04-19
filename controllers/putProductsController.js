const Services = require('../services/Services');

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const product = await Services.putProductsService(id, name, quantity);

    if (product.message) {
        return res.status(product.code).json({ message: product.message });
    }

    return res.status(200).json(product);
};

module.exports = updateProduct;