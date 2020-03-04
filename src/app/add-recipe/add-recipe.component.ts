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
      ingredients: ['List of ingredients', Validators.required],
      steps: ['1. ', Validators.required]
    })
   
  }

  get field() { return this.newRecipeForm.controls; }

  // Maybe change this to submitRecipe
  addRecipe() {
    this.submitted = true;
    if (this.newRecipeForm.invalid) {
      return;
    }
    this.loading = true;
    // Also, putting this data into FormData and sending one 
    // thing might be a better direction.
    this.recipeService.saveRecipe(
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

  backToView(): void {
    this.router.navigate(['/recipe-list']);
  }

}
