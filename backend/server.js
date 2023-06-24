const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/recipe-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Configure storage for image uploads
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single('image');

// Recipe model
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// API routes
app.post('/api/recipes', upload, (req, res) => {
  const { title, description } = req.body;
  const image = req.file.filename;

  const recipe = new Recipe({ title, description, image });

  recipe.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error creating recipe' });
    });
});

app.get('/api/recipes', (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving recipes' });
    });
});

app.get('/api/recipes/:id', (req, res) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving recipe' });
    });
});

app.put('/api/recipes/:id', upload, (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : undefined;

  Recipe.findByIdAndUpdate(id, { title, description, image }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating recipe' });
    });
});

app.delete('/api/recipes/:id', (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json({ message: 'Recipe deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error deleting recipe' });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
