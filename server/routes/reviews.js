const express = require('express');
const router = express.Router();
const db = require('../db');

const { check, validationResult } = require('express-validator');

// @route   GET api/v1/reviews/:id
// @desc    Get all restaurant reviews
router.get('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const { rows } = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [
      restaurantId,
    ]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send("There's no restaurant with such id.");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// @route   POST api/v1/reviews
// @desc    Post a restaurant reviews
router.post('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const { author, rating, text } = req.body;
  try {
    const {
      rows,
    } = await db.query(
      'INSERT INTO reviews (restaurant_id, author, rating, text) VALUES ($1, $2, $3, $4) RETURNING *;',
      [restaurantId, author, rating, text],
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("There's no restaurant with such id.");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// @route   GET api/v1/reviews/avg/:restaurant_id
// @desc    Get the average reviews of a given restaurant
router.get('/avg/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const {
      rows,
    } = await db.query(
      'SELECT TRUNC(AVG(rating),2) AS avg_rating from reviews WHERE restaurant_id = $1;',
      [restaurantId],
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("There's no restaurant with such id.");
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
