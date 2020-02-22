import * as express from 'express';
import {
    addRecipe,
    viewRecipes,
    // deleteRecipe,
    updateRecipe
} from '../controllers/recipe.controller';

export const recipeRoutes = express.Router();

// Add recipe
// { 
    // "HTTP": "POST", 
    // "SQL": "INSERT", 
    // "CRUD": "CREATE"
// }
recipeRoutes.post('/new', addRecipe);

// View recipes
// { 
    // "HTTP": "GET", 
    // "SQL": "SELECT", 
    // "CRUD": "READ"
// }
recipeRoutes.get('/view', viewRecipes);

// Update recipe
// { 
    // "HTTP": "PUT", 
    // "SQL": "", 
    // "CRUD": "UPDATE"
// }
recipeRoutes.put('updateRecipe', updateRecipe )

// Delete recipe
// { 
    // "HTTP": "DELETE", 
    // "SQL": "DELETE", 
    // "CRUD": "DELETE"
// }
// recipeRoutes.delete('/view', deleteRecipe);