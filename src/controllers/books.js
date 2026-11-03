
import { getAllBooks, getBookById } from '../models/books.js';

const getAllBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error retrieving book:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { getAllBooksHandler, getBookByIdHandler };
