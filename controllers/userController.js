const { User } = require("../models");

const userController = {};

userController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

userController.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

userController.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
