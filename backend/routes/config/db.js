// Example PostgreSQL and MongoDB setup
const { Pool } = require("pg");
const mongoose = require("mongoose");

const pgPool = new Pool({
  user: "your_user",
  host: "localhost",
  database: "marine",
  password: "your_password",
  port: 5432
});

mongoose.connect("mongodb://localhost:27017/marine", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = { pgPool, mongoose };
