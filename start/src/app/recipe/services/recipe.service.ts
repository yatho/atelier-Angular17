import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Meals, Recipe, RecipeV2 } from '../models/recipe';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url: string = '/api/recipes'
  private http = inject(HttpClient);

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  getById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.url}/${id}`);
  }

  create(recipe: RecipeV2): Observable<RecipeV2> {
    return this.http.post<RecipeV2>(this.url, recipe);
  }

  update(id: number, recipe: RecipeV2): Observable<RecipeV2> {
    return this.http.put<RecipeV2>(`${this.url}/${id}`, recipe);
  }

  getIdeaByMealName(mealName: string) : Observable<Meals> {
    const params = new HttpParams().append('i', mealName);
    return this.http.get<Meals>('/recipeApi', {
      params
    });
  }
}
