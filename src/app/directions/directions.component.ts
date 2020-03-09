import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { RecipeModel } from 'backend/models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit, OnDestroy {
  recipe: RecipeModel;
  recipeSubscription: Subscription;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
      this.recipeSubscription = this.recipeService.selectedRecipe.subscribe((recipe) => 
        this.recipe = recipe
      );
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe;
  }

}
