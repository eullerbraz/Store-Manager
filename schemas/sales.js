const productModel = (require('../models'))('products');

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

module.exports = { validateIdFormat, validateSale };
