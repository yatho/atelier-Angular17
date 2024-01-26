import { Component, Input } from '@angular/core';
import {  RecipeV2 } from '../../models/recipe';

@Component({
  selector: 'app-v2',
  templateUrl: './v2.component.html',
  styleUrl: './v2.component.css'
})

export class V2Component  {
  @Input({required: true}) recipe!: RecipeV2;
}
