const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products');
    return products;
};

module.exports = {
    getAll,
};