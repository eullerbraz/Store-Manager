const saleService = require('../services/sales');

const create = async (req, res, next) => {
  const itensSold = req.body;

  const sale = await saleService.create(itensSold);

  if (sale.message) return next(sale);

  return res.status(200).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await saleService.getAll();
  
  res.status(200).json({ sales });
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await saleService.findById(id);

  if (sale.message) return next(sale);

  return res.status(200).json(sale);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const itensSold = req.body;
  
  const updated = await saleService.update({ id, itensSold });

  if (updated.message) return next(updated);

  return res.status(200).json(updated);
};

module.exports = { create, getAll, findById, update };
