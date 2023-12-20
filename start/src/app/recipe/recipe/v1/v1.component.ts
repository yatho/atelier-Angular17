import { Component, Input } from '@angular/core';
import { RecipeV1 } from '../../models/recipe';

@Component({
  selector: 'app-v1',
  templateUrl: './v1.component.html',
  styleUrl: './v1.component.css'
})
export class V1Component {
  @Input({required: true}) recipe!: RecipeV1;
}
