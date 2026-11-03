import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const db = getDb();
  return await db.collection('books').find().toArray();
};

const getBookById = async (id) => {
  const db = getDb();
  return await db.collection('books').findOne({ id: id });
};

export { getAllBooks, getBookById };
