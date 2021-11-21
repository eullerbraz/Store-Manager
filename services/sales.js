const saleModel = (require('../models'))('sales');
const productModel = (require('../models'))('products');
const { validateIdFormat, validateQuantity } = require('../schemas/sales');

const create = async (products) => {
  const isValidSale = await products.map(async ({ productId, quantity }) => {
    const found = (await productModel.findById(productId));

    return validateIdFormat(productId)
    && found
    && validateQuantity(quantity);
  }).reduce(async (acc, isValidProduct) => (await acc === (await isValidProduct)), true);

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

module.exports = { create, getAll, findById };