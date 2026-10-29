
import { getAllBooks } from '../models/books.js';

const getAllBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllBooksHandler };
