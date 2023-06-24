import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/recipes')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving recipes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Recipe List</h1>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <img src={`/uploads/${recipe.image}`} alt={recipe.title} />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
