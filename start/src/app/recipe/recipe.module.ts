import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { V1Component } from './recipe/v1/v1.component';
import { V2Component } from './recipe/v2/v2.component';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeFormComponent,
    V1Component,
    V2Component
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ]
})
export class RecipeModule { }
