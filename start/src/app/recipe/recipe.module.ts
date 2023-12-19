import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { VeganComponent } from './recipe/vegan/vegan.component';
import { OtherComponent } from './recipe/other/other.component';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeFormComponent,
    VeganComponent,
    OtherComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ]
})
export class RecipeModule { }
