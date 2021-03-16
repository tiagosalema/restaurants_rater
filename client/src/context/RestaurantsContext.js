import { createContext, useState } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
  const [restaurants, setRestaurants] = useState([]);

  const addRestaurant = restaurant => {
    setRestaurants([...restaurants, restaurant]);
  };

  const deleteRestaurant = id => {
    setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
  };

  return (
    <RestaurantsContext.Provider
      value={{ restaurants, setRestaurants, addRestaurant, deleteRestaurant }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
