import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../../../backend/models/recipe.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
    recipeList$: Observable<RecipeModel[]>;
    selectedRecipe: RecipeModel;
    
    constructor(
      private recipeService: RecipeService, 
      private router: Router
    ) { }
  
    ngOnInit() {
      this.recipeList$ = this.recipeService.getRecipes();
    }
  

updateRecipe(): void {
  this.router.navigate(['/updateRecipe']);
}
}
