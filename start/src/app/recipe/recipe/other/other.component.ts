import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrl: './other.component.css'
})
export class OtherComponent {

  @Input()
  recipe?: Recipe;

}
