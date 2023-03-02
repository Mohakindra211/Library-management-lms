const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { validateUser } = require("../validators/userValidator");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate user input
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user with given email or username already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ message: "Email already exists" });
    }
    user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({ username, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
