const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (collection, item) => {
  const { _id, ...newItem } = item;
  const db = await connection();
  const { insertedId } = await db.collection(collection).insertOne(newItem);
  return { ...newItem, _id: insertedId };
};

const findByName = async (collection, name) => {
  const db = await connection();
  const row = await db.collection(collection).findOne({ name });

  return row;
};

const findById = async (collection, id) => {
  const db = await connection();
  const row = await db.collection(collection).findOne({ _id: ObjectId(id) });

  return row;
};

const getAll = async (collection) => {
  const db = await connection();
  const rows = await db.collection(collection).find().toArray();

  return rows;
};

const update = async (collection, newItem) => {
  const { id, ...data } = newItem;
  const db = await connection();
  await db.collection(collection).updateOne(
    { _id: ObjectId(id) },
    { $set: { ...data } },
  );

  return { _id: id, ...data };
};

const remove = async (collection, id) => {
  const db = await connection();
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

module.exports = { create, findByName, findById, getAll, update, remove };
