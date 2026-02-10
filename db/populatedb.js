require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

const SQL = `CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW()
);`;

async function createTables() {
  try {
    await client.connect();
    console.log("Connected to the database.");
    await client.query(SQL);
    console.log("Database populated successfully.");
    await client.end();
    console.log("Database connection closed.");
  } catch (err) {
    console.error("Error populating the database:", err);
  }
}

createTables();
