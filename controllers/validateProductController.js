const { validateProduct } = require('../services/validateProductService');

const postProduct = async (req, res, next) => {
        const arrayItems = req.body;
        const products = arrayItems.map((item) => validateProduct(item));
         await Promise.all(products);
        console.log('products', products);
    
        const temErro = products.find(async (item) => {
            const product = await item;
            console.log('find', product.message);
            return product.message;
    });
            const productErr = await temErro;
            console.log('productErr', productErr);
            if (productErr.message) {
                return res.status(productErr.code).json({ message: productErr.message });
            }

        next();
};
module.exports = postProduct;