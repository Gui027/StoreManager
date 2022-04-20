const Services = require('../services/Services');

const postProduct = async (req, res, next) => {
        const arrayItems = req.body;
        const products = arrayItems.map((item) => Services.validateProduct(item));
         await Promise.all(products);
    
        const temErro = products.find(async (item) => {
            const product = await item;
            return product.message;
    });
            const productErr = await temErro;

            if (productErr.message) {
                return res.status(productErr.code).json({ message: productErr.message });
            }

        next();
};
module.exports = postProduct;