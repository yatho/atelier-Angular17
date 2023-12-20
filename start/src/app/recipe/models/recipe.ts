export type Recipe = RecipeV1 | RecipeV2;

export type CommonRecipe = {
    id: number;
    name: string;
}

export type RecipeV1 = CommonRecipe & {
    version: 'v1';
    instructions: string[];
    ingredients: string[];
    type: RecipeType;
}

export type RecipeV2 = CommonRecipe & {
    version: 'v2';
    id: number;
    name: string;
    ingredients: Ingredient[];
    howTo: string[];
    type: RecipeType;
}

export type Ingredient = {
    amount: number,
    unit?: UnitOfMeasurement;
    name: string
}

export enum UnitOfMeasurement {
    Gramm = 'g',
    Milliliter = 'ml'
}

export enum RecipeType {
    Dessert = "Dessert",
    MainCourse = "Main course",
    Starter = "Starter",
    Aperitif = "Aperitif",
    Other = "Other"
}