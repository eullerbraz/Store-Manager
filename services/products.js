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

const findById = async (id) => {
  
  if (typeof id !== 'string' || id.length !== 24) {
    return { code: 'invalid_data', message: 'Wrong id format' };
  }
  
  const product = await productModel.findById(id);
  
  if (!product) {
    return { code: 'invalid_data', message: 'Wrong id format' };
  }

  return product;
};

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

module.exports = { create, findById, getAll };
