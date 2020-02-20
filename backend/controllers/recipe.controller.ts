import { Recipe, RecipeModel } from '../models/recipe.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export const addRecipe = async (req: any, res: any) => {
    try {
        const newRecipe = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            steps: req.body.ingredients
        };
        const recipe = new Recipe(newRecipe);
        // I should probably be generating unique IDs for recipes...
        // MongoDB does that automatically if you don't specify an _id
        // Where are you calling the save function to MongoDB?? I don't see it
        
        res.status(201).send({recipe});
    } catch (error) {
        res.status(500).send('SERVER_ERROR');
        // res.status(418).send('IM_A_TEAPOT');
    }
};

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

// export const updateRecipe = async (req: any, res: any) => {
//   const newRecipe = {} as RecipeModel;
//   if (req.body.title) {
//     newRecipe['title'] = req.body.title;
//   }
//   if (req.body.ingredients) {
//     newRecipe['ingredients'] = req.body.ingredients;
//   }
//   if (req.body.lastName) {
//     newRecipe['lastName'] = req.body.lastName;
//   }
//   User.findByIdAndUpdate(req.user.title, {
//       $set: newRecipe
//     }, (error: any, data: any) => {
//       if (error) {
//         res.status(500).send('UPDATE_FAIL');
//       } else {
//         res.send(data);
//       }
//     }
//   );
// };
