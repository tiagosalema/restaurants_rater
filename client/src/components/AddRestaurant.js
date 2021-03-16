import { useState, useContext } from 'react';
import { fetchRestaurants } from '../api/fetch';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const initialState = {
    name: '',
    location: '',
    price_range: 0,
  };
  const [restaurant, setRestaurant] = useState(initialState);
  const { name, location, price_range } = restaurant;
  const onChange = ({ target: { name, value } }) => {
    setRestaurant({
      ...restaurant,
      [name]: value,
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetchRestaurants.post('/', restaurant);
      addRestaurant(res.data);
      setRestaurant(initialState);
    } catch (error) {
      console.log('oops');
      console.error(error.message);
    }
  };
  return (
    <form className='add-restaurant' onSubmit={onSubmit}>
      <input
        type='text'
        className='form-control'
        placeholder='Restaurant'
        name='name'
        value={name}
        onChange={onChange}
        required
      />
      <input
        type='text'
        className='form-control'
        placeholder='Location'
        name='location'
        value={location}
        onChange={onChange}
        required
      />
      <select value={price_range} name='price_range' onChange={onChange} required>
        <option value=''>Cost</option>
        {[1, 2, 3, 4, 5].map(i => (
          <option key={i} value={i}>
            {'£'.repeat(i)}
          </option>
        ))}
      </select>
      <button type='submit' className='btn btn-primary'>
        Add
      </button>
    </form>
  );
};

export default AddRestaurant;
