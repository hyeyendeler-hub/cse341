
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists
} from '../models/books.js';

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

const createBookHandler = async (req, res) => {
  try {
    const { id, title, authorId, publicationDate } = req.body;

    if (!id || !title || !authorId || !publicationDate) {
      return res.status(400).json({
        message: 'All fields are required: id, title, authorId, publicationDate.'
      });
    }

    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({ message: 'Book ID already exists.' });
    }

    const author = await authorExists(authorId);

    if (!author) {
      return res.status(400).json({ message: 'Author does not exist.' });
    }

    const book = { id, title, authorId, publicationDate };
    await createBook(book);

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const { title, authorId, publicationDate } = req.body;

    if (!title || !authorId || !publicationDate) {
      return res.status(400).json({
        message: 'All fields are required: title, authorId, publicationDate.'
      });
    }

    const existingBook = await getBookById(req.params.id);

    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    const author = await authorExists(authorId);

    if (!author) {
      return res.status(400).json({ message: 'Author does not exist.' });
    }

    const book = { title, authorId, publicationDate };
    await updateBook(req.params.id, book);

    res.status(200).json({ id: req.params.id, ...book });
  } catch (error) {
    console.error('Error updating book:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBookHandler = async (req, res) => {
  try {
    const existingBook = await getBookById(req.params.id);

    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    await deleteBook(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};