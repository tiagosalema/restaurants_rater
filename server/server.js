require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/restaurants', require('./routes/restaurants'));
app.use('/api/v1/reviews', require('./routes/reviews'));

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}...`);
});
