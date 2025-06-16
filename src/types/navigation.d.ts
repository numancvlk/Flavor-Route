export type RootParamList = {
  HomeScreen: undefined;
  FavoritesScreen: undefined;
  AddRecipeScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}
