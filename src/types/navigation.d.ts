import { Recipe } from "./Recipe";

export type RootParamList = {
  HomeScreen: undefined;
  MyRecipesScreen: undefined;
  FavoritesScreen: undefined;
  AddRecipeScreen: { recipeToEdit?: Recipe } | undefined;
  RecipeDetailScreen: { recipeId: string };
  CookingModeScreen: { recipeId: string };
  BottomTabs: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}
