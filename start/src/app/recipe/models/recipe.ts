export type Recipe = RecipeV1 | RecipeV2;

export type CommonRecipe = {
  id: number | null;
  name: string;
  instructions: string[];
  photo?: string;
};

export type RecipeV1 = CommonRecipe & {
  version: 'v1';
  ingredients: string[];
  type: RecipeType;
};

export type RecipeV2 = CommonRecipe & {
  version: 'v2';
  ingredients: Ingredient[];
  type: RecipeType;
};

export type Ingredient = {
  quantity: number;
  unit: UnitOfMeasurement;
  name: string;
};

export enum UnitOfMeasurement {
  None = '',
  Gramm = 'g',
  Milliliter = 'ml',
  Once = 'oz',
  Unit = 'unit',
}

export enum RecipeType {
  None = '',
  Dessert = 'Dessert',
  MainCourse = 'Main course',
  Starter = 'Starter',
  Aperitif = 'Aperitif',
  Other = 'Other',
}

export type Meals = {
  meals: MealDetail[]
}

export type MealDetail = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}