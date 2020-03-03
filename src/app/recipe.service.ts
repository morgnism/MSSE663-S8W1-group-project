// 3rd Party Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  HttpClient, 
          HttpHeaders,
          HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// 3rd party stuff injected into our project
import { environment } from '../environments/environment';

// MSSE 663 20S8W1 Imports
import { RecipeModel } from '../../backend/models/recipe.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  API_URL: string = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // private newRecipeSubject: BehaviorSubject<RecipeModel>;
  // private newRecipe$: Observable<RecipeModel>;
  private recipeToUpdate$: Observable<RecipeModel>;

  constructor(private httpClient: HttpClient, public router: Router) {
    // this.newRecipeSubject: BehaviorSubject<RecipeModel>
  }

  getRecipes(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/recipes/recipe-list`).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  selectedRecipe(recipe: RecipeModel): Observable<any> {
    return;
  }

  // ToDo: type our return observable

  // Maybe rename function too, also noted in component
  // Also, you're using FormGroup in add-recipe, you can put that
  // into FormData and send that instead of sending each piece.
  // Example: addRecipe(form: FormData)(~.post<any>("theUrl/recipes/addRecipe", form))

  saveRecipe(title: string, ingredients: string, steps: string): Observable<RecipeModel> {
    console.log(title + ingredients + steps);
    return this.httpClient.post<RecipeModel>(`${this.API_URL}/recipes/new`, {title, ingredients, steps}, httpOptions);
  }

  getRecipe(id): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/recipes/view`).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  updateRecipe(title: string, ingredients: string, steps: string) {
    return this.httpClient.put<any>(`${this.API_URL}/recipes/updateRecipe`, {title, ingredients, steps}).pipe(
      map((res: any) => {
        this.getRecipe(res._id).subscribe((result) => {
          this.recipeToUpdate$ = result;
          localStorage.setItem('recipe', JSON.stringify(result));
          return result;
        });
      }),
      catchError(this.handleError));
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    const errorCode = errorRes.error;
    switch (errorCode) {
      case 'SERVER_ERROR':
        errorMessage = 'Something happened server-side and the recipe wasn\'t added.';
        break;
      case 'UPDATE_FAIL':
        errorMessage = 'Failed to update recipe. Please try again.';
        break;
      default: {
        errorMessage = 'An error occurred! Please try again or contact support.';
        break;
      }
    }
    return throwError(errorMessage);
  }
}
