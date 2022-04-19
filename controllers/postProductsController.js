const { postProductService } = require('../services/Services');

const postProduct = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await postProductService(name, quantity);

    if (product.message) {
        return res.status(product.code).json({ message: product.message });
    }
    
    return res.status(201).json(product);
};

module.exports = postProduct;