const saleModel = (require('../models'))('sales');
const productModel = (require('../models'))('products');
const { validateIdFormat, validateQuantity } = require('../schemas/sales');

const create = async (products) => {
  const isValidSale = await products.map(async ({ productId, quantity }) => {
    const found = (await productModel.findById(productId));

    return found
    && validateIdFormat(productId)
    && validateQuantity(quantity);
  }).reduce(async (acc, isValidProduct) => (await acc === (await isValidProduct)), true);

  if (!isValidSale) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }

  const sale = await saleModel.create({ itensSold: products });

  return sale;
};

module.exports = { create };