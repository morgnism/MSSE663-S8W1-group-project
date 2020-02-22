import * as express from 'express';
import { auth } from '../middleware/auth';
import {
    addRecipe,
    viewRecipes,
    deleteRecipe
} from '../controllers/recipe.controller';

export const recipeRoutes = express.Router();

// Add recipe
// Note to self: This should be an HTTP POST, SQL INSERT, CRUD CREATE
recipeRoutes.post('/new', auth, addRecipe);

// View recipes
// Note to self: This should be one or a series of HTTP GET, SQL SELECT, CRUD READ operations
recipeRoutes.get('/view', auth, viewRecipes);

// Update recipe
// Note to self: This should be an HTTP PUT, CRUD UPDATE
// userRouts.put('updateRecipe', auth, updateRecipe )

// Delete recipe
recipeRoutes.delete('/view', auth, deleteRecipe);