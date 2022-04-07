const { getAllSales, getSalesById } = require('../services/getSalesServices');

const getAllS = async (_req, res) => {
    const sales = await getAllSales();
    return res.status(200).json(sales);
};

const getByIdS = async (req, res) => {
    const { id } = req.params;
    const sale = await getSalesById(id);
    if (sale.message) {
        return res.status(sale.code).json({ message: sale.message });
      }
    
      return res.status(200).json(sale);
};

module.exports = {
    getAllS,
    getByIdS,
};