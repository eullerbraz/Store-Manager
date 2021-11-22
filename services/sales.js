const saleModel = (require('../models'))('sales');
const { validateIdFormat, validateSale } = require('../schemas/sales');

const create = async (products) => {
  const isValidSale = await validateSale(products);

  if (!isValidSale) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }

  const sale = await saleModel.create({ itensSold: products });

  return sale;
};

const getAll = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const findById = async (id) => {
  const isValidId = validateIdFormat(id);

  if (!isValidId) return { code: 'not_found', message: 'Sale not found' };

  const sale = await saleModel.findById(id);

  if (!sale) return { code: 'not_found', message: 'Sale not found' };

  return sale;
};

const update = async (newSale) => {
  const { id, itensSold } = newSale;
  const isValidSale = await validateSale(itensSold);

  if (!isValidSale) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }

  const updated = await saleModel.update({ id, itensSold });

  return updated;
};

module.exports = { create, getAll, findById, update };