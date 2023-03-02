const { Op } = require("sequelize");
const { Book } = require("../models");
const { validateBook } = require("../validators/bookValidator");

const bookController = {};

bookController.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
};

bookController.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

bookController.searchBooks = async (req, res, next) => {
  try {
    const { query } = req.query;
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
          { genre: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
};

bookController.createBook = async (req, res, next) => {
  try {
    const { title, author, genre } = req.body;

    // Validate book input
    const { error } = validateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = await Book.create({ title, author, genre });

    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    next(error);
  }
};

bookController.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, genre } = req.body;

    // Validate book input
    const { error } = validateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    await book.save();

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    next(error);
  }
};

bookController.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = bookController;
