import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeRoutingModule } from './recipe-routing.module';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeFormComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ]
})
export class RecipeModule { }
