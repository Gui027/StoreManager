const Model = require('../models/ProductModel');
const Services = require('./getProductsService');

const deleteProductById = async (id) => {
  console.log('services', Services);
  if (id) {
    const product = await Services.getByIdProducts(id);
  
    if (product.message) {
      return product;
    }
  
    await Model.deleteProduct(id);
    console.log(product);
    return product;
  }
};

module.exports = deleteProductById;