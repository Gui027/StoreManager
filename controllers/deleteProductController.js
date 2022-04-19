const { deleteProductService } = require('../services/Services');

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await deleteProductService(id);

  if (product.message) {
    return res.status(404).json({ message: product.message });
  }

  return res.status(204).json(product);
};

module.exports = deleteProduct;