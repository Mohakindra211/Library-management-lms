const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json")[
  process.env.NODE_ENV || "development"
];

const sequelize = require("../config/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user",
  },
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

User.prototype.getSignedJwtToken = function () {
  return jwt.sign({ id: this.id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

module.exports = User;
