import mongoose = require('mongoose');
import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import cors = require('cors');

import { databaseName } from './environment';
import { userRoutes } from './routes/user.routes';
import { recipeRoutes } from './routes/recipe.routes';
import { Recipe } from './models/recipe.model';

const app = express();

// Set port number
const port = process.env.PORT || 3000;

// Connecting to database
mongoose.connect(databaseName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// If there is a connection error with db
db.on('error', console.error.bind(console, 'connection error:'));

// If DB is opened successfully
db.once('open', () => {
  console.log('Connection Successful!');
});

// CORS Middleware
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);

// Start Server
app.listen(port, () => {
  console.log('Server started and listening on port ' + port);
});

function defaultRecipes() {
  let recipes = [
    {
      title: "First recipe",
      ingredients: "MongoDB",
      steps: "1. Make a database"
    },
    {
      title: "Second recipe",
      ingredients: "Angular CLI: HTML, CSS, TypeScript",
      steps: "2. Make an Angular app"
    },
    {
      title: "Third recipe",
      ingredients: "Mongoose, express, cor",
      steps: "3. Hook them up"
    }
  ];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = new Recipe(recipes[i]);
    recipe.save();
  }

  console.log("Default recipes loaded");
}
