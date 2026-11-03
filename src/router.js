import express from 'express';
import {
  getAllBooksHandler,
  getBookByIdHandler
} from './controllers/books.js';

const router = express.Router();

router.get('/books', getAllBooksHandler);
router.get('/books/:id', getBookByIdHandler);

export default router;