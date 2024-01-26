import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, RecipeType, UnitOfMeasurement } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { getFromResolvers } from '../../utility';

export function enumValidator(enumType: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && !Object.values(enumType).includes(control.value)) {
      return { 'invalidEnumValue': { value: control.value } };
    }
    return null;
  };
}

// type IngredientsForm = FormGroup<{
//   quantity: FormControl<number>;
//   unit: FormControl<UnitOfMeasurement>;
//   name: FormControl<string>;
// }>;

// type InstructionForm = FormControl<string>;
@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent implements OnInit {
  recipe?: Recipe = getFromResolvers<Recipe>('recipe');
  
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public formGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl('', {
      validators: [Validators.required, Validators.min(3)]
    }), 
    photo: new UntypedFormControl(''),
    type: new UntypedFormControl(RecipeType.None, {
      validators: [Validators.required, enumValidator(RecipeType)]
    }),
    ingredients: new UntypedFormArray([]),
    instructions: new UntypedFormArray([]),
    version: new UntypedFormControl('v2')
  });

  recipeTypes:Array<string> = Object.values(RecipeType); 
  unitOfMeasure:Array<string> = Object.values(UnitOfMeasurement); 
  
  ngOnInit(): void {
    if (!this.recipe || this.recipe.version !== 'v2') return;
    this.recipe.ingredients.forEach(() => this.addIngredient());
    this.formGroup.patchValue(this.recipe);
  }

  get ingredientsForm() {
    return this.formGroup.get('ingredients') as UntypedFormArray;
  }

  addIngredient(): void {
    this.ingredientsForm.push(new UntypedFormGroup({
      quantity: new UntypedFormControl(0),
      name: new UntypedFormControl(''),
      unit: new UntypedFormControl(UnitOfMeasurement.None)
    }));
  }

  removeIngredientAt(index: number) : void {
    this.ingredientsForm.removeAt(index);
  }

  get instructionsForm() {
    return this.formGroup.get('instructions') as UntypedFormArray;
  }

  addInstruction(): void {
    this.instructionsForm.push(new UntypedFormControl(''));
  }

  removeInstructiontAt(index: number) : void {
    this.instructionsForm.removeAt(index);
  }

  saveRecipe() {
    if (this.formGroup.invalid) return;

    const recipe = this.formGroup.getRawValue();

    let obs;
    if (!recipe) return;
    if (!!recipe.id)
      obs = this.recipeService.update(recipe.id, recipe);
    else
      obs = this.recipeService.create(recipe);

      obs.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.router.navigateByUrl('/recipes');
      })
  }
}
