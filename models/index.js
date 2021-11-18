const { create, findByName } = require('./entity');

module.exports = (collection) => ({
  create: (item) => create(collection, item),
  findByName: (name) => findByName(collection, name),
});
