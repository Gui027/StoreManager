const connection = require('./connection');

const createSalesModel = async (sales) => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
    );
    
    const saleProducts = await sales.map(async ({ product_id: productId, quantity }) => {
      await connection.query(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [sale.insertId, productId, quantity],
        );
      });
      
      await Promise.all(saleProducts); // https:pt.stackoverflow.com/questions/446251/quais-as-diferen%C3%A7as-entre-promise-all-e-promise-allsettled
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises
      
      return {
        id: sale.insertId,
        itemSold: sales,
      };
    };
    
    const getAllSalesModel = async (id) => { 
        if (id) {
            const [sales] = await connection.execute(`SELECT s.date AS date,
          sp.product_id AS productId, sp.quantity AS quantity
          FROM StoreManager.sales_products AS sp INNER JOIN 
          StoreManager.sales AS s ON s.id = sp.sale_id
          WHERE sp.sale_id = ?;`, [id]);
    
            return sales;
        }
    
        const [sales] = await connection.execute(`SELECT sp.sale_id AS saleId, s.date AS date,
          sp.product_id AS productId, sp.quantity AS quantity
          FROM StoreManager.sales_products AS sp INNER JOIN StoreManager.sales AS s 
          ON s.id = sp.sale_id;`);
    
        return sales;
    };

    const updateSalesModel = async (id, productId, quantity) => {
      const [update] = await connection.execute(
        'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
        [quantity, id, productId],
      );

      return update;
    };
    
    module.exports = {
      getAllSalesModel,
      createSalesModel,
      updateSalesModel,
    };