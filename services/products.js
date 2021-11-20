const productModel = (require('../models'))('products');
const { validate } = require('../schemas/products');

const create = async (item) => {
  const { name, quantity } = item;

  const exists = await productModel.findByName(name);
  const { message, code } = validate(name, quantity);

  if (exists) {
    return { code: 'invalid_data', message: 'Product already exists' };
  }

  if (message) return { message, code };

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

const update = async (newProduct) => {
  const { name, quantity } = newProduct;
  const { message, code } = validate(name, quantity);
  
  if (message) return { message, code };
  
  const updated = await productModel.update({ name, quantity });
  return updated;
};

module.exports = { create, findById, getAll, update };
