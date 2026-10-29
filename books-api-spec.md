# Books API Spec — Version 1

## Purpose
Create a basic web service that returns book data.

## Data Model
Book fields:
- id: string
- author: string
- title: string
- publicationDate: string

## Endpoints

### 1. GET /books
- Returns all books.
- Response status: 200 on success.

### 2. GET /books/:id
- Returns one book with a matching id.
- Response status: 200 on success.
- If no book matches the id, return 404.

## Initial Assumptions
- Data is stored in a MongoDB collection named `books`.
- The API returns JSON.

## Evaluation of Version 1

### 1. Missing Details
Version 1 does not clearly define the format of the publication date or show example JSON responses. The improved specification should define the required fields and use the date format YYYY-MM-DD.

### 2. Security Concerns
The API should not expose database passwords, stack traces, or internal database errors to clients. The MongoDB connection string should be stored in an environment variable and should not be committed to GitHub.

### 3. Performance Concerns
The GET /books endpoint may become slow if the database contains many books. The application should retrieve only the fields required by the API and use pagination if the collection grows large.

### 4. Unclear Error Handling
Version 1 does not explain what response should be returned when the database fails. The API should return status 500 with a safe message such as "Internal server error". If a requested book does not exist, it should return status 404 with the message "Book not found".

---

# Books API Specification — Version 2

## 1. Purpose
Build a read-only Books API using Express and MongoDB. The API allows a client application to retrieve all books or retrieve one book by its ID.

## 2. Data Model
- Database: `cse341-books-db`
- Collection: `books`

Each book must contain:
- `id`: A required, unique string identifier, such as `"b1"`.
- `author`: A required string containing the author's name.
- `title`: A required string containing the book title.
- `publicationDate`: A required string in ISO 8601 date format `YYYY-MM-DD`, such as `"2021-08-17"`.

## 3. Endpoints

### Endpoint 1: Get All Books
- Method: `GET`
- Route: `/books`
- Purpose: Return all books.
- Input: No request body is required.
- Success status: `200 OK`
- Error status: `500 Internal Server Error` if the server cannot retrieve the books.

Success response example:
```json
[
  {
    "id": "b1",
    "author": "Maya Rivera",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  }
]
```

### Endpoint 2: Get One Book
- Method: `GET`
- Route: `/books/:id`
- Purpose: Return one book matching the requested ID.
- Input: The ID is provided as a route parameter, for example `/books/b1`.
- Success status: `200 OK`
- Not-found status: `404 Not Found`
- Error status: `500 Internal Server Error` if the server cannot retrieve the book.

Success response example:
```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

Not-found response example:
```json
{
  "message": "Book not found"
}
```

## 4. Error Handling and Security
- Return JSON responses consistently.
- Do not expose database passwords, stack traces, or internal database error details to API clients.
- For unexpected server errors, return status `500` with this safe response:
```json
{
  "message": "Internal server error"
}
```
- Store the MongoDB connection string in an environment variable.
- Do not commit `.env` files or database credentials to GitHub.

## 5. Implementation Notes
- Use Express to define the API routes.
- Use the MongoDB collection named `books`.
- Seed the collection with book documents needed for testing.
- Query books using the custom `id` field.

## 6. Out of Scope for Week 1
- Creating books with `POST`.
- Updating books with `PUT` or `PATCH`.
- Deleting books with `DELETE`.
- Authentication and authorization.