const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER || null,
  process.env.DB_PASS || null,
  {
    host: process.env.SERVIDOR,
    dialect: process.env.DB,
    logging: false,
  }
);

module.exports = db;
