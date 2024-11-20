import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { getFromResolvers } from '../../utility';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    standalone: false
})
export class RecipeListComponent {
  recipes?: Recipe[] = getFromResolvers<Recipe[]>('recipes');

  displayIdeas = false;
}
