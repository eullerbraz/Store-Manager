const productModel = (require('../models'))('products');
const { validateProduct, validateIdFormat } = require('../schemas/products');

const create = async (item) => {
  const { name, quantity } = item;

  const exists = await productModel.findByName(name);
  const { message, code } = validateProduct(name, quantity);

  if (exists) {
    return { code: 'invalid_data', message: 'Product already exists' };
  }

  if (message) return { message, code };

  const product = await productModel.create(item);
  return product;
};

const findById = async (id) => {
  const validationId = validateIdFormat(id);

  if (validationId.message) return validationId;
  
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
  const { id, name, quantity } = newProduct;
  const validationId = validateIdFormat(id);
  const validationProduct = validateProduct(name, quantity);

  if (validationId.message) return validationId;
  
  if (validationProduct.message) return validationProduct;
  
  const updated = await productModel.update({ name, quantity });
  return updated;
};

const remove = async (id) => {
  const validationId = validateIdFormat(id);

  if (validationId.message) return validationId;

  const product = await productModel.findById(id);

  if (!product) {
    return { code: 'invalid_data', message: 'Wrong id format' };
  }

  await productModel.remove(id);

  return product;
};

module.exports = { create, findById, getAll, update, remove };
