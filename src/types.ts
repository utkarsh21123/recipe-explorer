export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
};

export type RecipesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};

export type RootStackParamList = {
  List: undefined;
  Detail: { recipe: Recipe };
};
