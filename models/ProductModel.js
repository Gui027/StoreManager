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

const putProduct = async (id, name, quantity) => {
    await connection.execute('UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id]);

    return {
        id,
        name,
        quantity,
    };
};

const deleteProduct = async (id) => {
    const [result] = await connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?', [id],
    );

    return result;
};

module.exports = {
    getAll,
    createProduct,
    putProduct,
    deleteProduct,
};