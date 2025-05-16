const { Sequelize } = require("sequelize");
const {
  DB_DATABASE,
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
} = require("../config");

const db = new Sequelize({
  dialect: "postgres",
  username: DB_USER,
  host: DB_HOST,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  logging: false,
});

module.exports = { db };
