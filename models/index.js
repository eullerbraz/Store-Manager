const { create, findByName, findById, getAll, update } = require('./entity');

module.exports = (collection) => ({
  create: (item) => create(collection, item),
  findByName: (name) => findByName(collection, name),
  findById: (id) => findById(collection, id),
  getAll: () => getAll(collection),
  update: (newProduct) => update(collection, newProduct),
});
