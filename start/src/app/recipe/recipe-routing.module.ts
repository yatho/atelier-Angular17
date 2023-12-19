import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

const routes: Routes = [
  {
    path: '', component: RecipeListComponent
  },
  {
    path: ':id/edit', component: RecipeFormComponent
  },
  {
    path: 'create', component: RecipeFormComponent
  },
  {
    path: ':id', component: RecipeComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
