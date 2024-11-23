const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;
// Open a connection to the SQLite database
const db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to the data database.");
});
// Create the table if it doesn't exist
db.run(`
      CREATE TABLE IF NOT EXISTS data (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             value TEXT
) `);

// Endpoint to add data to the database
app.get("/add", (req, res) => {
  const { value } = req.query;
  db.run("INSERT INTO data (value) VALUES (?)", [value], (err) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "Error adding data to the database" });
    }
    res.status(201).json({ message: "Data added successfully" });
  });
});
// Endpoint to list all data
app.get("/list", (req, res) => {
  db.all("SELECT * FROM data", (err, rows) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "Error retrieving data from the database" });
    }
    res.json(rows);
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
