import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Observable } from 'rxjs';

interface Recipe {
  name: string;
  type: string[];
}

const recipesData: Observable<Recipe[]> = of([
  {
    name: 'Stuffed Peppers',
    type: ['vegan']
  },
  {
    name: 'Gluten-free Cake',
    type: ['gluten-free', 'vegan', 'dessert']
  }
]);

@Component({
  selector: 'app-recipes-container',
  templateUrl: './recipes-container.component.html',
  styleUrls: ['./recipes-container.component.scss']
})
export class RecipesContainerComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor() {}

  ngOnInit() {
    this.recipes$ = recipesData; // this.serviceName.getRecipes()
  }
}
