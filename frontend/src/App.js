import React from 'react';
import { Switch, Route, Link } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';


function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
