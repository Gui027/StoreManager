const Model = require('../models/ProductModel');
const Services = require('./getProductsService');

const deleteProductById = async (id) => {
  if (id) {
    const product = await Services.getByIdProducts(id);
  
    if (product.message) {
      return product;
    }
  
    await Model.deleteProduct(id);

    return product;
  }
};

module.exports = deleteProductById;