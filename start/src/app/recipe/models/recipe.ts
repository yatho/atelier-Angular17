export type ResponseType = VeganResponseType | OtherResponseType;

export type VeganResponseType = {
    type: 'vegan';
    recipe: VeganRecipe;
}

export type OtherResponseType = {
    type: 'nonVegan';
    recipe: Recipe;
}

export type VeganRecipe = Recipe & {
    theme: string; // Salé / Sucré / Sans gluten / express
}

export type Recipe = {
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