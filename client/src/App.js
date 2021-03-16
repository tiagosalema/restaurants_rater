import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Restaurant from './components/Restaurant';
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import Update from './routes/Update';

function App() {
  return (
    <RestaurantsContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/update/:id' component={Update}></Route>
          <Route exact path='/restaurant/:id' component={Restaurant}></Route>
        </Switch>
      </Router>
    </RestaurantsContextProvider>
  );
}

export default App;
