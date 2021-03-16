import axios from 'axios';

export const fetchRestaurants = axios.create({
  baseURL: 'http://localhost:5000/api/v1/restaurants',
});

export const fetchReviews = axios.create({
  baseURL: 'http://localhost:5000/api/v1/reviews',
});
