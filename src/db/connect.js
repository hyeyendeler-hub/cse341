

import dns from 'node:dns';
import { MongoClient } from 'mongodb';

dns.setServers(['8.8.8.8', '1.1.1.1']);

let db;

const connectToDb = async () => {
  const connectionString = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  if (!connectionString || !dbName) {
    throw new Error('Missing MongoDB environment variables.');
  }

  const client = new MongoClient(connectionString);
  await client.connect();

  db = client.db(dbName);
  console.log(`Connected to MongoDB database: ${dbName}`);
};

const getDb = () => {
  if (!db) {
    throw new Error('Database has not been connected.');
  }

  return db;
};

export { connectToDb, getDb };
