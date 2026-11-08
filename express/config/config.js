require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASSWORD || "your_actual_postgres_password",
    "database": process.env.DB_NAME || "your_database_name",
    "host": process.env.DB_HOST || "127.0.0.1",
    "port": process.env.DB_PORT || 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
   "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASSWORD || "your_actual_postgres_password",
    "database": process.env.DB_NAME || "your_database_name",
    "host": process.env.DB_HOST || "127.0.0.1",
    "port": process.env.DB_PORT || 5432,
    "dialect": "postgres"
  }
};