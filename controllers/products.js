const productService = require('../services/products');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productService.create({ name, quantity });

  if (product.message) {
    return next(product);
  }

  return res.status(201).json(product);
};

const getAll = async (req, res) => {
  const products = await productService.getAll();

  return res.status(200).json({ products });
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const product = await productService.findById(id);

  if (product.message) {
    return next(product);
  }

  return res.status(200).json(product);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updated = await productService.update({ id, name, quantity });

  if (updated.message) {
    return next(updated);
  }

  return res.status(200).json(updated);
};

module.exports = { create, getAll, findById, update };
