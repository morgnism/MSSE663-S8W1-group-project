// 3rd Party Imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// MSSE 663 20S8W1 Imports
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { Recipe } from 'backend/models/recipe.model';

const routes: Routes = [
  { path: '',               redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',          component: LoginComponent },
  { path: 'register',       component: RegisterComponent },
  { path: 'new',            component: AddRecipeComponent },
  { path: 'recipe-list',    component: RecipeListComponent },
  { path: 'updateRecipe',   component: UpdateRecipeComponent },
  { path: 'ingredients/:ingredients', component:IngredientsComponent},
  
  {
    path: 'profile',      component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
