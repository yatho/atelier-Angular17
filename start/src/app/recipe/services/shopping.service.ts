import { Injectable, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService implements OnDestroy {
  private _recipesSelected: Recipe[] = [];
  private _shoppingList: string[] = [];
  private _recipeSelectedEvent = new ReplaySubject<Recipe[]>();

  constructor() {
    const recipeSavedStr = sessionStorage.getItem('recipesSelected');
    if (!!recipeSavedStr) {
      const recipeListSaved: Recipe[] = JSON.parse(recipeSavedStr);
      recipeListSaved.forEach(recipe => {this.addSelectedRecipe(recipe)});
    }
  }

  get recipesSelected(): Recipe[] {
    return this._recipesSelected;
  }

  get shoppingList(): string[] {
    return this._shoppingList;
  }

  get recipeSelectedEvent(): ReplaySubject<Recipe[]> {
    return this._recipeSelectedEvent;
  }

  addSelectedRecipe(recipe: Recipe): void {
    this._recipesSelected.push(recipe);
    this.calculateShoppingList();
    this.notify();
  }

  removeSelectedRecipe(recipe: Recipe): void {
    this._recipesSelected = this._recipesSelected.filter(recipeSelected => recipeSelected.id !== recipe.id);
    this.calculateShoppingList();
    this.notify();
  }

  clearAllRecipeSelected(): void {
    this._recipesSelected = [];
    this._shoppingList = [];
    this.notify();
  }

  private notify(): void {
    sessionStorage.setItem('recipesSelected', JSON.stringify(this._recipesSelected));
    this._recipeSelectedEvent.next(this._recipesSelected);
  }

  private calculateShoppingList() : void {
    this._shoppingList = [];
    this._recipesSelected.forEach(recipe => {
      if (recipe.version === 'v2') {
        this._shoppingList = [
          ...this._shoppingList,
          ...recipe.ingredients.flatMap(
            (ingredient) =>
              ingredient.name + ' ' + ingredient.quantity + ' ' + ingredient.unit
          ),
        ];
      } else {
        this._shoppingList = [...this._shoppingList, ...recipe.ingredients];
      }
    });
  }

  ngOnDestroy(): void {
      this._recipeSelectedEvent.complete();
  }
}
