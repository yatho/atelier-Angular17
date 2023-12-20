import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

export const recipesResolver: ResolveFn<Observable<Recipe[]>> = (route, state) => {
  return inject(RecipeService).getAll();
};
