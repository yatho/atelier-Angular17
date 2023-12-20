import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';

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
}
