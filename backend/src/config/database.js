const { Sequelize } = require("sequelize");

const db_uri = process.env.DB_URI;

const sequelize = new Sequelize(db_uri, {
  dialect: "postgres",
});

module.exports = sequelize;
