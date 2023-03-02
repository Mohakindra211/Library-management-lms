const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
