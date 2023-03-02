const validationHandler = (validator) => async (req, res, next) => {
  try {
    await validator(req, res, next);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

module.exports = validationHandler;
