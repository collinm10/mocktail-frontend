import logo from './logo.svg';
import './App.css';

//Import components
import DrinkOrderMenu from './Components/DrinkOrderMenu';
import IngredientDashboard from './Components/IngredientDashboard';

function App() {
  let ingredients = []

  for(let i = 0; i < 3; i++){
    ingredients[i] = <IngredientDashboard id={i + 1}></IngredientDashboard>
  }

  return (
    <div className="App">
      <DrinkOrderMenu />
      <hr></hr>
      {ingredients}
    </div>
  );
}

export default App;
