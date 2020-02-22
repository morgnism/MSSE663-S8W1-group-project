import { Recipe, RecipeModel } from '../models/recipe.model';
import * as fs from 'fs';

// CRUD Create, HTTP Post
export const addRecipe = async (req: any, res: any) => {
    try {
        const newRecipe = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            steps: req.body.ingredients
        };
        const recipe = new Recipe(newRecipe);
        
        recipe.save( (error, thisRecipe) => {
            if (error) {
                // return console.log(error);
                return console.error(error);
            }
            console.log(req.body.title + " was added to the database!")
        });
        
        
        // recipe.save().then( result => {
        //     res.status(202).json({
        //         message: "Saved a recipe!",
        //         recipeStuff: {
        //             // name: result['title'],
        //             // steps: result.steps
        //         }
        //     })
        // }).catch( err => {
        //     console.log(err),
        //     res.status(505).json({
        //         error: err
        //     });
        // });
        
        res.status(201).send({recipe});
    } catch (error) {
        res.status(500).send('SERVER_ERROR');
        // res.status(418).send('IM_A_TEAPOT');
    }
};

// CRUD Read, HTTP Get
export const viewRecipes = async (req: any, res: any) => {
    try {
        // const recipes = await Recipe.findMany({...recipes});
        // await something.something(); probably
        // return something;

        // res.send(req.recipe)

        // This is an idea:
        // const {title, ingredients, steps} = req.body;
        // const recipe = await findByTitle(title);
        // if (!recipes) {
        //      throw new Error('NO RECIPES'); 
        // }

    } catch (error) {
        // Not technically that the page doesn't exist,
        // but that the recipes don't exist
        res.status(404).send(error);
    }
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
