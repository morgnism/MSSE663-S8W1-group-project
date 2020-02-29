import {model, Schema} from 'mongoose';

export class RecipeModel {
    constructor(newTitle: string, newIngredients: string[], newSteps: string[]) {
        this.title = newTitle;
        this.ingredients = newIngredients;
        this.steps = newSteps;
    };

    id?: number; // probably actually mandatory
    title: string;
    tags?: Tag[];
    knownAllergens?: Allergen[];
    prepTime?: number[]; // [hours, minutes]
    cookTime?: number[]; // [hours, minutes]
    // total time inferred, prep time + cook time
    ingredients: string[];
    steps: string[];
    story?: string;
    comments?: string;
}

export const RecipeSchema = new Schema<RecipeModel>({
    title: {
        type: String
    },
    ingredients: {
        type: String // ?
    },
    steps: {
        type: String // ?
    }
});

export const Recipe = model('Recipe', RecipeSchema);

export enum Tag {
    GlutenFree,
    DairyFree,
    Vegan,
    Vegetarian,
    Pescatarian,
    Sattvic,
    Halal,
    KosherPareve,
    KosherDairy,
    KosherMeat,
    KosherNeutral,
    NutFree
}

export enum Allergen {
    nuts,
    treeNuts,
    eggs,
    dairy,
    coconut,
    cherry
}