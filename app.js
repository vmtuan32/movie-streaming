const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'movie',
  host: 'db',
  database: 'movie_streaming',
  password: 'movie123',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send("Movie Streaming Pre-Prod API. DB Time: ${result.rows[0].now}");
  } catch (err) {
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log("App running on http://localhost:${port}");
});