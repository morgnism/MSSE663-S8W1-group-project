import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../../../backend/models/recipe.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
    recipeTitle: string;
    recipeIngredients: string;
    
    constructor(
      private route: ActivatedRoute,
      private router: Router,
    ) {
     
     }
  
    ngOnInit() {
      this.route.paramMap
      .subscribe(
        // params => this.recipeTitle = params.get('title'));
        params => this.recipeIngredients = params.get('ingredients'))
      
      } 

updateRecipe(): void {
  this.router.navigate(['/updateRecipe']);
}
}
