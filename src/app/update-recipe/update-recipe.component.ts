// 3rd Party
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

// MSSE 663 20S8W1
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss']
})
export class UpdateRecipeComponent implements OnInit {

  newRecipeForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.newRecipeForm = this.formBuilder.group({
      title: ['update me'], // TODO: Make an observable
      ingredients: ['update me'], // TODO: Make an observable
      steps: ['update me'] // TODO: Make an observable
    });
  }

  get field() { return this.newRecipeForm.controls; }

  updateRecipe() {
    this.submitted = true;
    if (this.newRecipeForm.invalid) {
      return;
    }
    this.loading = true;
    this.recipeService.saveRecipe(
      this.field.title.value,
      this.field.ingredients.value,
      this.field.steps.value
    ).
      pipe(first())
      .subscribe(
        data => {
          window.alert('Recipe updated!');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      )
  }

}
