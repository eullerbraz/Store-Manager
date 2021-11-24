const saleModel = require('../models/saleModel');
const { validateIdFormat, validateSale, updateProductsQuantity } = require('../schemas/sales');

const create = async (products) => {
  const isValidSale = await validateSale(products);

  if (!isValidSale) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }

  const isInvalidUpdate = await updateProductsQuantity(
    products.map(({ quantity, ...data }) => ({ ...data, quantity: -quantity })),
    );

    if (isInvalidUpdate.message) return isInvalidUpdate;

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
  const isValidId = validateIdFormat(id);

  if (!isValidId) return { code: 'not_found', message: 'Sale not found' };

  if (!isValidSale) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }

  const found = await saleModel.findById(id);

  const isInvalidUpdate = await updateProductsQuantity(
    itensSold.map(({ quantity, ...data }, index) => {
      const quantityVariation = found.itensSold[index].quantity - quantity;
      return { ...data, quantity: quantityVariation };
    }),
  );

  if (isInvalidUpdate.message) return isInvalidUpdate;

  const updated = await saleModel.update({ id, itensSold });

  return updated;
};

const remove = async (id) => {
  const isValidId = validateIdFormat(id);

  if (!isValidId) return { code: 'invalid_data', message: 'Wrong sale ID format' };

  const found = await saleModel.findById(id);

  if (!found) return { code: 'not_found', message: 'Wrong sale ID format' };

  await updateProductsQuantity(found.itensSold);

  await saleModel.remove(id);

  return found;
};

module.exports = { create, getAll, findById, update, remove };