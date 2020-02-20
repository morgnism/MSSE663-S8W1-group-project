import * as express from 'express';
import { auth } from '../middleware/auth';
import { 
    registerUser, 
    loginUser, 
    getLoggedInUser, 
    logoutAllUser, 
    logoutUser, 
    updateUser } from '../controllers/user.controller';
import {
    addRecipe,
    viewRecipes
} from '../controllers/recipe.controller';

export const userRoutes = express.Router();

// Register User
userRoutes.post('/register', registerUser);

// Login User
userRoutes.post('/login', loginUser);

// Get logged in user information
userRoutes.get('/me', auth, getLoggedInUser);

// User logs out from CURRENT device
userRoutes.post('/logout', auth, logoutUser);

// User logs out from ALL devices
userRoutes.post('/logoutAll', auth, logoutAllUser);

// Update User. Slightly adapted to only work with password and isAuthor field.
userRoutes.put('/update', auth, updateUser);

// Should I separate these out into recipes.routes.ts?

// Add recipe
// Note to self: This should be an HTTP POST, SQL INSERT, CRUD CREATE
userRoutes.post('/new', auth, addRecipe);

// View recipes
// Note to self: This should be one or a series of HTTP GET, SQL SELECT, CRUD READ operations
userRoutes.get('/view', auth, viewRecipes);
// Might also allow for HTTP, SQL and CRUD DELETE based on a button per recipe.

// TODO: Home should be default to View or Add Recipe?

// TODO: Edit recipe; will change URL above to /updateUser
// userRouts.put('updateRecipe', auth, __ )