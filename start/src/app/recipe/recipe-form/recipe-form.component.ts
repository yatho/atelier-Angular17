import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  @Input() recipe?: Recipe;
}
