import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../../../backend/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipeList$: Observable<RecipeModel[]>;
  recipe: Observable<RecipeModel> = new Observable();
  
  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeList$ = this.recipeService.getRecipes();
  }

selectRecipe(recipe:RecipeModel): void {
  this.recipeService.setSelectedRecipe(recipe);
}
  addRecipe(): void {
    this.router.navigate(['/new']);
  }
}
