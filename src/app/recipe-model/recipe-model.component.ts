import { Component, OnInit } from '@angular/core';
import { recipe } from './recipe-model.model';

@Component({
  selector: 'app-recipe-model',
  templateUrl: './recipe-model.component.html',
  styleUrls: ['./recipe-model.component.scss']
})
export class RecipeModelComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    let myRecipe: recipe;
  }

}
