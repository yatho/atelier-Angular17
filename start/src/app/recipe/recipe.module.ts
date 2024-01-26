import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { V1Component } from './recipe/v1/v1.component';
import { V2Component } from './recipe/v2/v2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { NgOptimizedImage } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { IdeasComponent } from './ideas/ideas.component';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeFormComponent,
    V1Component,
    V2Component,
    ShoppingListComponent,
    IdeasComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatStepperModule,
    NgOptimizedImage
  ]
})
export class RecipeModule { }
