const { deleteSalesModel } = require('../models/SalesModel');
const { getSalesById } = require('./getSalesServices');

const deleteSalesById = async (id) => {
  const sales = await getSalesById(id);

  if (sales.message) {
    return sales;
  }

  await deleteSalesModel(id);
  return sales;
};

module.exports = deleteSalesById;