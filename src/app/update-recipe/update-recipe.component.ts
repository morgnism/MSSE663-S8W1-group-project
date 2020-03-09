// 3rd Party
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

// MSSE 663 20S8W1
import { RecipeService } from '../recipe.service';
import { RecipeModel } from 'backend/models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss']
})
export class UpdateRecipeComponent implements OnInit, OnDestroy {
  recipe: RecipeModel;
  newRecipeForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  recipeSubscription: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.recipeSubscription = this.recipeService.selectedRecipe.subscribe((recipe) => 
        this.recipe = recipe
      );
    this.populateForm();
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  populateForm(): void {
    this.newRecipeForm = this.formBuilder.group ({
      title: [this.recipe.title, Validators.required],
      ingredients: [this.recipe.ingredients, Validators.required],
      steps: [this.recipe.steps, Validators.required],
    });
  }

  get field() { return this.newRecipeForm.controls; }

  updateRecipe() {
    this.submitted = true;
    if (this.newRecipeForm.invalid) {
      return;
    }   
    this.loading = true;
    this.recipeService.updateRecipe(this.recipe._id, this.field.title.value,
      this.field.ingredients.value,
      this.field.steps.value)
          .subscribe(
        data => console.log(data), 
        err => console.log(err),
        () => this.router.navigate(['./main'])
      ); 
    }   
  } 
