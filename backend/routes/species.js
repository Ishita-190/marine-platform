const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get all species
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM species ORDER BY scientific_name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get species by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM species WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;