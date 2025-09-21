const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Check table counts
router.get('/counts', async (req, res) => {
  try {
    const species = await pool.query('SELECT COUNT(*) FROM species');
    const locations = await pool.query('SELECT COUNT(*) FROM locations');
    const occurrences = await pool.query('SELECT COUNT(*) FROM marine_occurrences');
    const institutions = await pool.query('SELECT COUNT(*) FROM institutions');
    
    res.json({
      species: species.rows[0].count,
      locations: locations.rows[0].count,
      occurrences: occurrences.rows[0].count,
      institutions: institutions.rows[0].count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;