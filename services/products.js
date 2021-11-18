const productModel = (require('../models'))('products');

const create = async (item) => {
  const { name, quantity } = item;

  const exists = await productModel.findByName(name);

  if (exists) {
    return { code: 'invalid_data', message: 'Product already exists' };
  }

  if (name.length < 5) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }
  
  if (quantity <= 0) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  
  if (!Number(quantity)) {
    return { code: 'invalid_data', message: '"quantity" must be a number' };
  }

  const product = await productModel.create(item);
  return product;
};

module.exports = { create };
