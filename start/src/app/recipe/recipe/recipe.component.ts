import { Component, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { ShoppingService } from '../services/shopping.service';
import { getFromResolvers } from '../../utility';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  recipe?: Recipe = getFromResolvers<Recipe>('recipe');
  private shoppingService = inject(ShoppingService);
  
  stockerIngredient(recipe: Recipe) {
    this.shoppingService.addSelectedRecipe(recipe); 
  }
}



