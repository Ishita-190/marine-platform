const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get all occurrences with details
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.occurrence_id,
        o.catalog_number,
        s.scientific_name,
        o.individual_count,
        o.sex,
        o.life_stage,
        o.event_date,
        o.habitat,
        o.basis_of_record,
        l.water_body,
        l.country,
        l.locality,
        l.decimal_latitude,
        l.decimal_longitude
      FROM marine_occurrences o
      JOIN species s ON o.species_id = s.id
      JOIN locations l ON o.location_id = l.id
      ORDER BY o.event_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get occurrences by location
router.get('/location/:waterBody', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.occurrence_id,
        s.scientific_name,
        o.individual_count,
        o.event_date,
        l.water_body,
        l.locality
      FROM marine_occurrences o
      JOIN species s ON o.species_id = s.id
      JOIN locations l ON o.location_id = l.id
      WHERE l.water_body = $1
      ORDER BY o.event_date DESC
    `, [req.params.waterBody]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;