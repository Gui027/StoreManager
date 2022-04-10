const { deleteProduct } = require('../models/ProductModel');
const { getByIdProducts } = require('./getProductsService');

const deleteProductById = async (id) => {
  const product = await getByIdProducts(id);

  if (product.message) {
    return product;
  }

  await deleteProduct(id);
  return product;
};

module.exports = deleteProductById;