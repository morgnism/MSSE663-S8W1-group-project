import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../../../backend/models/recipe.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit, OnDestroy {
  recipe: RecipeModel;
  recipeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {

  }

  ngOnInit() {
    this.recipeSubscription = this.recipeService.selectedRecipe.subscribe((recipe) =>
      this.recipe = recipe
    );
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }


}
