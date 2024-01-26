import { Component, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  private shoppingService = inject(ShoppingService);
  protected recipeList: Recipe[] = this.shoppingService.recipesSelected
  protected shoppingList: string[] = this.shoppingService.shoppingList;

  protected removeSelectedRecipe(recipe: Recipe): void {
    this.shoppingService.removeSelectedRecipe(recipe);
    this.refreshList();
  }

  protected clearAllRecipeSelected(): void {
    this.shoppingService.clearAllRecipeSelected();
    this.refreshList();
  }

  private refreshList(): void {
    this.recipeList = this.shoppingService.recipesSelected;
    this.shoppingList = this.shoppingService.shoppingList;
  }
}
