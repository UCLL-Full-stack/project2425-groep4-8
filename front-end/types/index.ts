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
  user: User;
  reviews: Review[];
};

export type Review = {
  id?: number;
  user: User;
  text: string;
  score: number;
  recipe: Recipe;
};

export type User = {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  recipes?: Recipe[];
  reviews?: Review[];
  role?: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};
