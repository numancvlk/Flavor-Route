export type RootParamList = {
  HomeScreen: undefined;
  MyRecipesScreen: undefined;
  FavoritesScreen: undefined;
  AddRecipeScreen: undefined;
  RecipeDetailScreen: { recipeId: string };
  CookingModeScreen: { recipeId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}
