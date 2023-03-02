const Joi = require("joi");

const userValidator = {};

userValidator.validateUser = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(422).json({ message: error.details[0].message });
  }
};

userValidator.validateUserId = async (req, res, next) => {
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

module.exports = userValidator;
