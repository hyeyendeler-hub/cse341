import express from 'express';
import {
  getAllBooksHandler,
  getBookByIdHandler
} from './controllers/books.js';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from './controllers/authors.js';
const router = express.Router();

router.get('/books', getAllBooksHandler);
router.get('/books/:id', getBookByIdHandler);
/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthors);
/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */
router.get('/authors/:id', getAuthorById);
/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Unable to create author
 */
router.post('/authors', createAuthor);
/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
*         description: Invalid input
*       404:
*         description: Author not found
*       500:
*         description: Unable to update author
*/
router.put('/authors/:id', updateAuthor);
/**
* @openapi
* /authors/{id}:
*   delete:
*     summary: Delete an author
*     tags:
*       - Authors
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       204:
*         description: Author deleted
*       404:
*         description: Author not found
*       409:
*         description: Cannot delete an author who has books
*       500:
*         description: Unable to delete author
*/
router.delete('/authors/:id', deleteAuthor);
export default router;