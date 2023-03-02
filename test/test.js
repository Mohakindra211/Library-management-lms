const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Book routes', () => {
  let token;

  beforeAll(async () => {
    // Login to get authentication token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password',
      });
    token = response.body.token;
  });

  describe('POST /api/books', () => {
    test('should create a new book', async () => {
      const response = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Book',
          author: 'Test Author',
          genre: 'Test Genre',
          ISBN: '123456789',
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Book');
      expect(response.body.author).toBe('Test Author');
      expect(response.body.genre).toBe('Test Genre');
      expect(response.body.ISBN).toBe('123456789');
    });
  });

  describe('GET /api/books', () => {
    test('should return a list of books', async () => {
      const response = await request(app)
        .get('/api/books')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/books/:id', () => {
    test('should return a book by id', async () => {
      const response1 = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Book',
          author: 'Test Author',
          genre: 'Test Genre',
          ISBN: '123456789',
        });
      const response2 = await request(app)
        .get(`/api/books/${response1.body.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response2.statusCode).toBe(200);
      expect(response2.body).toHaveProperty('id');
      expect(response2.body.title).toBe('Test Book');
      expect(response2.body.author).toBe('Test Author');
      expect(response2.body.genre).toBe('Test Genre');
      expect(response2.body.ISBN).toBe('123456789');
    });
  });

  describe('PUT /api/books/:id', () => {
    test('should update a book by id', async () => {
      const response1 = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Book',
          author: 'Test Author',
          genre: 'Test Genre',
          ISBN: '123456789',
        });
      const response2 = await request(app)
        .put(`/api/books/${response1.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Updated Test Book',
        });
      expect(response2.statusCode).toBe(200);
      expect(response2.body).toHaveProperty('id');
      expect(response2.body.title).toBe('Updated Test Book');
      expect(response2.body.author).toBe('Test Author');
      expect(response2.body.genre).toBe('Test Genre');
     
describe('POST /api/books', () => {
  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        genre: 'Fiction',
        quantity: 10,
        price: 15.99,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('The Alchemist');
    expect(res.body.author).toEqual('Paulo Coelho');
    expect(res.body.genre).toEqual('Fiction');
    expect(res.body.quantity).toEqual(10);
    expect(res.body.price).toEqual(15.99);
  });

  it('should return an error if missing required fields', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        author: 'Paulo Coelho',
        genre: 'Fiction',
        quantity: 10,
        price: 15.99,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Invalid request data. Please review request and try again.');
  });
});

describe('GET /api/books', () => {
  it('should return a list of books', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/books/:bookId', () => {
  it('should return a book by ID', async () => {
    const book = await Book.create({
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Fiction',
      quantity: 10,
      price: 15.99,
    });
    const res = await request(app)
      .get(`/api/books/${book.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(book.id);
    expect(res.body.title).toEqual('The Alchemist');
    expect(res.body.author).toEqual('Paulo Coelho');
    expect(res.body.genre).toEqual('Fiction');
    expect(res.body.quantity).toEqual(10);
    expect(res.body.price).toEqual(15.99);
  });

  it('should return an error if book ID is invalid', async () => {
    const res = await request(app)
      .get('/api/books/invalid')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Invalid book ID.');
  });

  it('should return an error if book is not found', async () => {
    const res = await request(app)
      .get('/api/books/99999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Book not found.');
  });
});

describe('PUT /api/books/:bookId', () => {
  it('should update a book by ID', async () => {
    const book = await Book.create({
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Fiction',
      quantity: 10,
      price: 
describe('PUT /api/books/:bookId', () => {
it('should update a book by ID', async () => {
const book = await Book.create({
title: 'The Alchemist',
author: 'Paulo Coelho',
genre: 'Fiction',
quantity: 10,
price: '15.99',
userId: user.id
});
const updatedBook = {
  title: 'The Alchemist - Updated',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  quantity: 15,
  price: '19.99'
};

const res = await request(app)
  .put(`/api/books/${book.id}`)
  .set('Authorization', `Bearer ${token}`)
  .send(updatedBook);

expect(res.status).toBe(200);
expect(res.body).toHaveProperty('id');
expect(res.body.title).toBe(updatedBook.title);
expect(res.body.author).toBe(updatedBook.author);
expect(res.body.genre).toBe(updatedBook.genre);
expect(res.body.quantity).toBe(updatedBook.quantity);
expect(res.body.price).toBe(updatedBook.price);
expect(res.body.userId).toBe(user.id);
});

it('should return a 401 error if user is not authenticated', async () => {
const book = await Book.create({
title: 'The Alchemist',
author: 'Paulo Coelho',
genre: 'Fiction',
quantity: 10,
price: '15.99',
userId: user.id
});
const updatedBook = {
  title: 'The Alchemist - Updated',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  quantity: 15,
  price: '19.99'
};

const res = await request(app)
  .put(`/api/books/${book.id}`)
  .send(updatedBook);

expect(res.status).toBe(401);
});

it('should return a 403 error if user is not authorized to update book', async () => {
const book = await Book.create({
title: 'The Alchemist',
author: 'Paulo Coelho',
genre: 'Fiction',
quantity: 10,
price: '15.99',
userId: adminUser.id
});
const updatedBook = {
  title: 'The Alchemist - Updated',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  quantity: 15,
  price: '19.99'
};

const res = await request(app)
  .put(`/api/books/${book.id}`)
  .set('Authorization', `Bearer ${adminToken}`)
  .send(updatedBook);

expect(res.status).toBe(403);
});

it('should return a 404 error if book is not found', async () => {
const updatedBook = {
title: 'The Alchemist - Updated',
author: 'Paulo Coelho',
genre: 'Fiction',
quantity: 15,
price: '19.99'
};
const res = await request(app)
  .put(`/api/books/${999}`)
  .set('Authorization', `Bearer ${adminToken}`)
  .send(updatedBook);

expect(res.status).toBe(404);
});
}),
describe('DELETE /api/books/:bookId', () => {
  it('should delete a book by ID', async () => {
    const book = await Book.create({
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Fiction',
      quantity: 10,
      price: '12.99',
    });

    const res = await request(app)
      .delete(`/api/books/${book.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(204);

    const deletedBook = await Book.findByPk(book.id);
    expect(deletedBook).toBeNull();
  });

  it('should return a 404 error if book is not found', async () => {
    const res = await request(app)
      .delete(`/api/books/${999}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(404);
  });

  it('should return a 401 error if user is not authenticated', async () => {
    const book = await Book.create({
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Fiction',
      quantity: 10,
      price: '12.99',
    });

    const res = await request(app).delete(`/api/books/${book.id}`);

    expect(res.status).toBe(401);
  });

  it('should return a 403 error if user is not an admin', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
      role: 'user',
    });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'johndoe@gmail.com', password: 'password' });

    const userToken = loginResponse.body.token;

    const book = await Book.create({
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Fiction',
      quantity: 10,
      price: '12.99',
    });

    const res = await request(app)
      .delete(`/api/books/${book.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
});
