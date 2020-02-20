// 3rd Party
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

// MSSE 663 20S8W1
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

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
  ) { 
    // if ( !this.authService.isLoggedIn() ) { 
    //    prevent user from creating new recipes 
    // }
  }

  ngOnInit() {
    this.newRecipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      steps: ['', Validators.required]
    });
    // Do we want to then take you to the recipe page?
    // Or let you enter a new recipe?
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/profile';
  }

  get field() { return this.newRecipeForm.controls; }

  addRecipe() {
    this.submitted = true;
    if (this.newRecipeForm.invalid) {
      return;
    }
    this.loading = true;
    this.recipeService.addRecipe(
      this.field.title.value,
      this.field.ingredients.value,
      this.field.steps.value
    ).
      pipe(first())
      .subscribe(
        data => {
          window.alert('New recipe added!');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      )
  }

}
