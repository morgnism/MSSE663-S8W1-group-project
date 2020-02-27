import { Recipe, RecipeModel } from '../models/recipe.model';
import * as fs from 'fs';

export const defaultCallback = (req: any, res: any) => (
    err: any,
    data: any
  ) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  };

// CRUD Create, HTTP Post
export const addRecipe = async (req: any, res: any) => {
    try {
        const newRecipe = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            steps: req.body.steps
        };
        const recipe = new Recipe(newRecipe);
        
        recipe.save( (error, thisRecipe) => {
            if (error) {
                // return console.log(error);
                return console.error(error);
            }
            console.log(req.body.title + " was added to the database!")
        });
        res.status(201).send({recipe});
    } catch (error) {
        res.status(500).send('SERVER_ERROR');
        // res.status(418).send('IM_A_TEAPOT');
    }
};

// CRUD Read, HTTP Get
export const viewRecipes = async (req: any, res: any) => {
    Recipe.find({}, defaultCallback(req, res));
};

// CRUD Update, HTTP Put
export const updateRecipe = async (req: any, res: any) => {
    const recipeToUpdate = {} as RecipeModel;
    if (req.body.title) {
        recipeToUpdate['title'] = req.body.title;
    }
    if (req.body.ingredients) {
        recipeToUpdate['ingredients'] = req.body.ingredients;
    }
    if (req.body.steps) {
        recipeToUpdate['steps'] = req.body.steps;
    }

    Recipe.findByIdAndUpdate(req.user.title, {
      $set: recipeToUpdate
    }, (error: any, data: any) => {
      if (error) {
        res.status(500).send('UPDATE_FAIL');
      } else {
        res.send(data);
      }
    });
};

export const deleteRecipe = async (title: string) => {
    // Search for recipe by unique identifier?
    // or title?
    const recipe = await Recipe.findOneAndDelete({title});
    if (!recipe) {
        throw new Error('404 Recipe not found error');
    }

    // return confirmation?
    // res.status(200).send('Delete successfull');
}
