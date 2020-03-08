import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeModel } from 'backend/models/recipe.model';
import { RecipeListComponent } from 'src/app/recipe-list/recipe-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-home',
  templateUrl: './recipe-home.component.html',
  styleUrls: ['./recipe-home.component.scss']
})
export class RecipeHomeComponent implements OnInit {
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  updateRecipe(): void {
    this.router.navigate(['/updateRecipe']);
  }
}
