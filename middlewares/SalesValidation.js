const validateProductId = (req, res, next) => {
    const sales = req.body;
    if (!sales.some((s) => s.product_id)) {
        return res.status(400).json({ message: '"productId" is required' });
    }

    return next();
};

const validateQuantitySales = (req, res, next) => {
    const sales = req.body;

    if (sales.some((s) => s.quantity === undefined)) {
        return res.status(400).json({ message: '"quantity" is required' });
    }

    if (sales.some((s) => s.quantity <= 0 || typeof s.quantity === 'string')) {
        return res.status(422).json({
            message: '"quantity" must be greater than or equal to 1',
        });
    }

    return next();
};

module.exports = {
    validateProductId,
    validateQuantitySales,
};