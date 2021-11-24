const productModel = require('../models/productModel');

const validateQuantity = (quantity) => {
    if (quantity <= 0) return false;
    if (!Number(quantity)) return false;

  return true;
};

const validateIdFormat = (id) => {
  if (typeof id !== 'string' || id.length !== 24) {
    return false;
  }
  return true;
};

const validateProduct = async ({ productId, quantity }) => {
  const found = (await productModel.findById(productId));

  return validateIdFormat(productId)
  && found
  && validateQuantity(quantity);
};

const validateSale = async (products) => {
  const isValidSale = await products
    .map(validateProduct)
    .reduce(async (acc, isValidProduct) => (await acc === (await isValidProduct)), true);

  return isValidSale;
};

const updateProductsQuantity = async (products) => {
  const isValidUpdate = await products.map(async (product) => {
    const foundProduct = await productModel.findById(product.productId);
    const quantity = foundProduct.quantity + product.quantity;

    if (quantity <= 0) {
      return false;
    }

    await productModel.update({ id: product.productId, quantity });
    return true;
  }).reduce(async (acc, isValid) => (await acc === (await isValid)), true);

  if (!isValidUpdate) {
    return { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
  }

  return {};
};

module.exports = { validateIdFormat, validateSale, updateProductsQuantity };
