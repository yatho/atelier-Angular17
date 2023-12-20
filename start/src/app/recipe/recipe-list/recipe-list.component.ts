import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  @Input() recipes?: Recipe[];

}
