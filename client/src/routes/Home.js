import AddRestaurant from '../components/AddRestaurant';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
  return (
    <div className='container'>
      <h1 className='font-weight-light display-1 text-center mt-5'>Rate a restaurant</h1>
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
