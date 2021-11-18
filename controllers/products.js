const productService = require('../services/products');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productService.create({ name, quantity });

  if (product.message) {
    return next(product);
  }

  res.status(201).json(product);
};

module.exports = { create };
