import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Recipe</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/add">
          <RecipeForm />
        </Route>
        <Route path="/">
          <RecipeList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
