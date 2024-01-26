import { Component, inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.css'
})
export class IdeasComponent {
  protected beefIdeas = inject(RecipeService).getIdeaByMealName('beef');
}
