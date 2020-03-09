import * as express from 'express';
import {
    addRecipe,
    viewRecipes,
    // deleteRecipe,
    updateRecipe,
    viewRecipe
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
recipeRoutes.get('/recipe-list', viewRecipes);

// Update recipe
// { 
    // "HTTP": "PUT", 
    // "SQL": "", 
    // "CRUD": "UPDATE"
// }
recipeRoutes.put('/updateRecipe/:id', updateRecipe )

// Delete recipe
// { 
    // "HTTP": "DELETE", 
    // "SQL": "DELETE", 
    // "CRUD": "DELETE"
// }
// recipeRoutes.delete('/view', deleteRecipe);

recipeRoutes.get('/view/:id', viewRecipe)