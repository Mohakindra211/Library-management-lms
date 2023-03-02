const Joi = require("joi");

const bookValidator = {};

bookValidator.validateBook = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().integer().required(),
    price: Joi.number().required(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(422).json({ message: error.details[0].message });
  }
};

bookValidator.validateBookId = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  try {
    await schema.validateAsync(req.params);
    next();
  } catch (error) {
    res.status(422).json({ message: error.details[0].message });
  }
};

module.exports = bookValidator;
