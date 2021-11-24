const { create, findByName, findById, getAll, update, remove } = require('./entity');

const COLLECTION = 'sales';

module.exports = {
  create: (item) => create(COLLECTION, item),
  findByName: (name) => findByName(COLLECTION, name),
  findById: (id) => findById(COLLECTION, id),
  getAll: () => getAll(COLLECTION),
  update: (newProduct) => update(COLLECTION, newProduct),
  remove: (id) => remove(COLLECTION, id),
};
