const connection = require('./connection');

const getAllSalesModel = async (id) => {
    if (id) {
        const [sales] = await connection.execute(`SELECT s.date AS date,
      sp.product_id AS productId, sp.quantity AS quantity
      FROM StoreManager.sales_products AS sp INNER JOIN StoreManager.sales AS s ON s.id = sp.sale_id
      WHERE sp.sale_id = ?;`, [id]);

        return sales;
    }

    const [sales] = await connection.execute(`SELECT sp.sale_id AS saleId, s.date AS date,
      sp.product_id AS productId, sp.quantity AS quantity
      FROM StoreManager.sales_products AS sp INNER JOIN StoreManager.sales AS s 
      ON s.id = sp.sale_id;`);

    return sales;
};

module.exports = {
    getAllSalesModel,
};