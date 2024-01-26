import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe';

export const recipeResolver: ResolveFn<Observable<Recipe>> = (route, _state) => {
  if (!route.paramMap.has('id'))
    return of();
  const id = Number.parseInt(route.paramMap.get('id')!);
  return inject(RecipeService).getById(id);
};
