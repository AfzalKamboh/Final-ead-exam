import React, { useState } from 'react';
import axios from 'axios';

function RecipeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    axios.post('/api/recipes', formData)
      .then((response) => {
        console.log('Recipe added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding recipe:', error);
      });
  };

  return (
    <div>
      <h1>Add Recipe</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default RecipeForm;
