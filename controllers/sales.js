const saleService = require('../services/sales');

const create = async (req, res, next) => {
  const itensSold = req.body;

  const sale = await saleService.create(itensSold);

  if (sale.message) return next(sale);

  return res.status(200).json(sale);
};

module.exports = { create };
