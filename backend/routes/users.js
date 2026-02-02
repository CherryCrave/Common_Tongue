const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Testing database inputs and connections
router.patch('/test/:name', async (req, res) => {
  try {
    const { name } = req.params;

    const query = 'UPDATE instruments SET name = $1 WHERE id = 1 RETURNING *';
    const result = await pool.query(query, [name]);

    res.json(result.rows[0]);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database test failed', details: err.message });
  }
});

module.exports = router;
