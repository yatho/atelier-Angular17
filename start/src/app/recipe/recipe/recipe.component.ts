import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  @Input({required: true}) recipe?: Recipe;
}
