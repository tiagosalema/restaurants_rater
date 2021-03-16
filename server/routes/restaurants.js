const express = require('express');
const router = express.Router();
const db = require('../db');

const { check, validationResult } = require('express-validator');

// @route   GET api/v1/restaurants
// @desc    Get all restaurants
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
    SELECT restaurants.id, name, location, price_range, TRUNC(AVG(rating), 2) AS reviews_average, COUNT(rating) AS reviews_count
    FROM restaurants
    LEFT JOIN reviews
    ON restaurants.id = reviews.restaurant_id
    GROUP BY restaurants.id;
`);
    res.json({
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error(err.message);
  }
});

// @route   GET api/v1/restaurants/:restaurantId
// @desc    Get restaurant by id
router.get('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const { rows } = await db.query('SELECT * FROM restaurants WHERE id = $1', [restaurantId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("There's no restaurant with such id.");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// @route   POST api/v1/restaurants
// @desc    Create restaurant
router.post(
  '/',
  check('name', 'name is missing.').not().isEmpty(),
  check('location', 'location is missing.').not().isEmpty(),
  check('price_range', 'price_range is missing.').not().isEmpty(),
  async (req, res) => {
    const { name, location, price_range } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const {
        rows,
      } = await db.query(
        'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;',
        [name, location, price_range],
      );
      // if statement not quite working
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(400).send('The inputs provided are wrong or incomplete.');
      }
    } catch (err) {
      console.error(err.message);
    }
  },
);

// @route   POST api/v1/restaurants/:restaurantId
// @desc    Update restaurant
router.post(
  '/:restaurantId',
  check('name', 'name is missing.').not().isEmpty(),
  check('location', 'location is missing.').not().isEmpty(),
  check('price_range', 'price_range is missing.').not().isEmpty(),
  async (req, res) => {
    const { name, location, price_range } = req.body;
    const { restaurantId } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const {
        rows,
      } = await db.query(
        'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
        [name, location, price_range, restaurantId],
      );
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(400).send('The inputs provided are wrong or incomplete!!.');
      }
    } catch (err) {
      console.error(err.message);
    }
  },
);

// @route   DELETE api/v1/restaurants/:restaurantId
// @desc    Delete restaurant
router.delete('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    await db.query('DELETE FROM reviews WHERE restaurant_id = $1;', [restaurantId]);
    const { rowCount } = await db.query('DELETE FROM restaurants WHERE id = $1', [restaurantId]);
    if (rowCount > 0) {
      // res.status(204).send('deleted successfully');
      res.status(204).send();
    } else {
      res.status(400).send('No such restaurant with that input.');
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
