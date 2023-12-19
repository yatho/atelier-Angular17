import { Component, Input } from '@angular/core';
import { VeganRecipe } from '../../models/recipe';

@Component({
  selector: 'app-vegan',
  templateUrl: './vegan.component.html',
  styleUrl: './vegan.component.css'
})
export class VeganComponent {

  @Input()
  recipe?: VeganRecipe;

}
