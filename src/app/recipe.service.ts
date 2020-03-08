// 3rd Party Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  HttpClient, 
          HttpHeaders,
          HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// 3rd party stuff injected into our project
import { environment } from '../environments/environment';

// MSSE 663 20S8W1 Imports
import { RecipeModel, Recipe } from '../../backend/models/recipe.model';
import { FormGroup } from '@angular/forms';

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

  selectedRecipe: Subject<RecipeModel> = new BehaviorSubject<RecipeModel>(new RecipeModel(null, null, null));

  constructor(private httpClient: HttpClient, public router: Router) {
    // this.newRecipeSubject: BehaviorSubject<RecipeModel>
  }

  setSelectedRecipe(recipe: RecipeModel) {
    this.selectedRecipe.next(recipe);
  }

  getRecipes(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/recipes/recipe-list`).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
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

  getRecipe(id:string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/recipes/view/${id}`).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
 
  updateRecipe(id: string, title: string, ingredients: string, steps: string) {
    return this.httpClient.put<any>(`${this.API_URL}/recipes/updateRecipe/${id}`, {title, ingredients, steps});
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
