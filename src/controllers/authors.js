import {
  getAllAuthors as getAllAuthorsFromDb,
  getAuthorById as getAuthorByIdFromDb,
  createAuthor as createAuthorInDb,
  updateAuthor as updateAuthorInDb,
  deleteAuthor as deleteAuthorFromDb,
  authorHasBooks
} from '../models/authors.js';

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsFromDb();
    return res.status(200).json(authors);
  } catch (error) {
    console.error('Error retrieving authors:', error);
    return res.status(500).json({ message: 'Unable to retrieve authors.' });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await getAuthorByIdFromDb(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Error retrieving author:', error);
    return res.status(500).json({ message: 'Unable to retrieve author.' });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;

    if (
      !id ||
      typeof id !== 'string' ||
      !name ||
      typeof name !== 'string' ||
      !Number.isInteger(birthYear)
    ) {
      return res.status(400).json({
        message: 'Please provide a valid id, name, and birthYear.'
      });
    }

    const existingAuthor = await getAuthorByIdFromDb(id);

    if (existingAuthor) {
      return res.status(400).json({ message: 'Author ID already exists.' });
    }

    const newAuthor = await createAuthorInDb({ id, name, birthYear });

    return res.status(201).json(newAuthor);
  } catch (error) {
    console.error('Error creating author:', error);
    return res.status(500).json({ message: 'Unable to create author.' });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    const { id } = req.params;

    if (
      !name ||
      typeof name !== 'string' ||
      !Number.isInteger(birthYear)
    ) {
      return res.status(400).json({
        message: 'Please provide a valid name and birthYear.'
      });
    }

    const existingAuthor = await getAuthorByIdFromDb(id);

    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    const updatedAuthor = await updateAuthorInDb(id, { name, birthYear });

    return res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error('Error updating author:', error);
    return res.status(500).json({ message: 'Unable to update author.' });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAuthor = await getAuthorByIdFromDb(id);

    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    const hasBooks = await authorHasBooks(id);

    if (hasBooks) {
      return res.status(409).json({
        message: 'Cannot delete an author who has books.'
      });
    }

    await deleteAuthorFromDb(id);

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting author:', error);
    return res.status(500).json({ message: 'Unable to delete author.' });
  }
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};