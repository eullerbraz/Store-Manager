const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (collection, item) => {
  const db = await connection();
  await db.collection(collection).insertOne(item);

  return { ...item };
};

const findByName = async (collection, name) => {
  const db = await connection();
  const product = await db.collection(collection).findOne({ name });

  return product;
};

const findById = async (collection, id) => {
  const db = await connection();
  const product = await db.collection(collection).findOne({ _id: ObjectId(id) });

  return product;
};

const getAll = async (collection) => {
  const db = await connection();
  const products = await db.collection(collection).find().toArray();

  return products;
};

const update = async (collection, newProduct) => {
  const { id, name, quantity } = newProduct;
  const db = await connection();
  await db.collection(collection).updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );

  return { id, name, quantity };
};

const remove = async (collection, id) => {
  const db = await connection();
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

module.exports = { create, findByName, findById, getAll, update, remove };
