import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../../../backend/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipeList$: Observable<RecipeModel[]> = of(this.recipes);
  selectedRecipe: RecipeModel;
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeList$ = this.recipeService.getRecipes();
  }

  selectRecipe(recipe: RecipeModel): void {
    console.log(recipe);
    this.recipeService.selectedRecipe(recipe);
  }

  addRecipe(): void {
    this.router.navigate(['/view']);
  }
}