import { Component, inject } from '@angular/core';
import { ShoppingService } from '../recipe/services/shopping.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected recipeSelectedEvent = inject(ShoppingService).recipeSelectedEvent;
}
