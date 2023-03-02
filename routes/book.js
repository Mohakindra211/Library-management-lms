const express = require("express");
const router = express.Router();
const { Book } = require("../models");
const validateRequest = require("../middleware/validateRequest");
const { bookSchema } = require("../schemas");

// Get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

// Get a book by id
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Create a new book
router.post("/", validateRequest(bookSchema), async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
});

// Update a book by id
router.put("/:id", validateRequest(bookSchema), async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      const updatedBook = await book.update(req.body);
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a book by id
router.delete("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
