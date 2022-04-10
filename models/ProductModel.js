const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products');
    return products;
};

const createProduct = async (name, quantity) => {
    const [product] = await connection.execute(
        'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
        [name, quantity],
    );

    return {
        id: product.insertId,
        name,
        quantity,
    };
};

module.exports = {
    getAll,
    createProduct,
};