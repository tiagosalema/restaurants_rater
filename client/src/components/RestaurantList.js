import { useEffect, useContext } from 'react';
import { fetchRestaurants } from '../api/fetch';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';
import RatingStars from './RatingStars';

const RestaurantList = () => {
  const { restaurants, setRestaurants, deleteRestaurant } = useContext(RestaurantsContext);
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const restaurants = await fetchRestaurants.get('/');
        setRestaurants(restaurants.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getRestaurants();
  }, [setRestaurants]);
  const history = useHistory();

  const onDelete = async id => {
    try {
      await fetchRestaurants.delete(id);
      deleteRestaurant(id);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className='mt-5'>
      <table className='table table-striped text-center'>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Restaurant</th>
            <th>Location</th>
            <th>Price range</th>
            <th>Ratings</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map(
              ({ id, name, location, reviews_average, reviews_count, price_range }) => {
                return (
                  <tr key={id} class='restaurant' onClick={() => history.push('/restaurant/' + id)}>
                    <td style={{ textAlign: 'left' }}>{name}</td>
                    <td>{location}</td>
                    <td>{'£'.repeat(price_range)}</td>
                    <td>
                      {+reviews_count ? <RatingStars stars={reviews_average} /> : null}
                      <small className='d-block'>({reviews_count || '0'} reviews)</small>
                    </td>
                    <td>
                      <button
                        className='btn btn-warning'
                        onClick={e => {
                          e.stopPropagation();
                          history.push(`update/${id}`);
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={e => {
                          e.stopPropagation();
                          onDelete(id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              },
            )}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
