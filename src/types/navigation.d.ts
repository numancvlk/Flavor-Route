export type RootParamList = {
  HomeScreen: undefined;
  MyRecipesScreen: undefined;
  FavoritesScreen: undefined;
  AddRecipeScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}
