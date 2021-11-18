const connection = require('./connection');

const create = async (collection, item) => {
  const conn = await connection();
  await conn.collection(collection).insertOne(item);

  return { ...item };
};

const findByName = async (collection, name) => {
  const conn = await connection();
  const product = await conn.collection(collection).findOne({ name });

  return product;
};

module.exports = { create, findByName };
