export type Ingredient = {
  id?: number;
  name: string;
  category: string;
};

export type Recipe = {
  id?: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  creator: User;
  reviews: Review[];
};

export type Review = {
  id?: number;
  writer: User;
  text: string;
  score: number;
  recipe: Recipe;
};

export type User = {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  recipes?: Recipe[];
  reviews?: Review[];
};
