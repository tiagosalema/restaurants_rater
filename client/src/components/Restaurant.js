import { useState, useEffect } from 'react';
import { fetchRestaurants, fetchReviews } from '../api/fetch';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';

const Restaurant = ({
  match: {
    params: { id },
  },
}) => {
  const [restaurant, setRestaurant] = useState('');
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    author: '',
    rating: '',
    text: '',
  });
  const [avgRating, setAvgRating] = useState('');
  const { author, rating, text } = review;
  useEffect(() => {
    try {
      const getRestaurant = async () => {
        const restaurant = await fetchRestaurants.get(id);
        setRestaurant(restaurant.data.name);
      };
      const getReviews = async () => {
        const reviews = await fetchReviews.get(id);
        setReviews(reviews.data);
      };
      const getAverageRating = async () => {
        const avgRating = await fetchReviews.get('/avg/' + id);
        setAvgRating(avgRating.data.avg_rating);
      };
      getRestaurant();
      getReviews();
      getAverageRating();
    } catch (error) {
      console.error(error.message);
    }
  }, [id]);

  const onChange = ({ target: { value, name } }) => {
    setReview({ ...review, [name]: value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const newReview = await fetchReviews.post(id, review);
      setReviews([...reviews, newReview.data]);
      const avgRating = await fetchReviews.get('/avg/' + id);
      setAvgRating(avgRating.data.avg_rating);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className='container mt-5'>
      <Link to='/'>&lt; Back to restaurants</Link>
      <h1 className='text-center mt-5'>{restaurant}</h1>
      <div className='mb-5 text-center'>
        <RatingStars stars={avgRating} />
      </div>
      <div className='d-flex' style={{ flexWrap: 'wrap' }}>
        {reviews.map(review => {
          return (
            review && (
              <div key={review.id} className='card bg-light mb-3 mx-2' style={{ width: '30%' }}>
                <div className='card-header d-flex justify-content-between'>
                  <span>{review.author}</span>
                  <RatingStars stars={review.rating} />
                </div>
                <div className='card-body'>
                  <p className='card-text'>{review.text}</p>
                </div>
              </div>
            )
          );
        })}
      </div>
      <form onSubmit={onSubmit} className='w-50 mx-auto'>
        <div className='d-flex my-3 justify-content-between'>
          <input
            type='text'
            className='form-control'
            style={{ width: '73%' }}
            placeholder='Name'
            name='author'
            value={author}
            onChange={onChange}
            required
          />
          <select
            className='form-control w-25 ml-2'
            name='rating'
            value={rating}
            onChange={onChange}
            required
          >
            <option value=''>Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <textarea
          className='form-control'
          placeholder='What do you think about this restaurant?'
          rows='4'
          name='text'
          value={text}
          onChange={onChange}
          required
        ></textarea>
        <button className='btn btn-primary mt-3' type='submit'>
          Add review
        </button>
      </form>
    </div>
  );
};

export default Restaurant;
