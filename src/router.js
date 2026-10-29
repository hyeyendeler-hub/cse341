
import express from 'express';
import { getAllBooksHandler } from './controllers/books.js';

const router = express.Router();

router.get('/books', getAllBooksHandler);

export default router;
