const Services = require('../services/Services');

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const sales = await Services.deleteSalesService(id);

  if (sales.message) {
    return res.status(404).json({ message: sales.message });
  }

  return res.status(204).json(sales);
};

module.exports = deleteSales;