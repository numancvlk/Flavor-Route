import { Recipe } from "./Recipe";
import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  HomeInitial: undefined;
};

export type FavoritesStackParamList = {
  FavoritesInitial: undefined;
};

export type MyRecipesStackParamList = {
  MyRecipesInitial: undefined;
};

export type RootParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;

  HomeScreen: NavigatorScreenParams<HomeStackParamList>;
  FavoritesScreen: NavigatorScreenParams<FavoritesStackParamList>;
  MyRecipesScreen: NavigatorScreenParams<MyRecipesStackParamList>;

  AddRecipeScreen: { recipeToEdit?: Recipe } | undefined;
  RecipeDetailScreen: { recipeId: string };
  CookingModeScreen: { recipeId: string };
};

export type BottomTabParamList = {
  HomeScreen: NavigatorScreenParams<HomeStackParamList>;
  FavoritesScreen: NavigatorScreenParams<FavoritesStackParamList>;
  MyRecipesScreen: NavigatorScreenParams<MyRecipesStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}
