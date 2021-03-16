import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRestaurants } from '../api/fetch';

const Update = ({
  match: {
    params: { id },
  },
}) => {
  const [restaurant, setRestaurant] = useState({});
  useEffect(() => {
    const fetchInitialRestaurant = async () => {
      const restaurant = await fetchRestaurants.get(id);
      console.log(restaurant);
      setRestaurant(restaurant.data);
    };
    fetchInitialRestaurant();
  }, [id]);
  const { name = '', location = '', price_range = '' } = restaurant;
  const history = useHistory();
  const onChange = ({ target: { name, value } }) => {
    setRestaurant({ ...restaurant, [name]: value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    await fetchRestaurants.post(id, restaurant);
    history.push('/');
  };
  return (
    <div className='container'>
      <h1 className='my-5 text-center'>Update restaurant</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='d-block mb-3'>
            Restaurant
            <input
              type='text'
              className='form-control'
              onChange={onChange}
              name='name'
              value={name}
            />
          </label>
          <label className='d-block mb-3'>
            Location
            <input
              type='text'
              className='form-control'
              onChange={onChange}
              name='location'
              value={location}
            />
          </label>
          <label className='d-block mb-3'>
            Price Range
            <select value={price_range} name='price_range' onChange={onChange} required>
              <option value=''>Cost</option>
              {[1, 2, 3, 4, 5].map(i => (
                <option key={i} value={i}>
                  {'£'.repeat(i)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
