import "react-native-get-random-values";
import { initializeDefaultRecipes } from "./src/services/recipeServices";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";

import AppNavigator from "./src/navigation/AppNavigator";
import AddRecipeScreen from "./src/screens/AddRecipeScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import CookingModeScreen from "./src/screens/CookingModeScreen";

import { RootParamList } from "./src/types/navigation";

const RootStack = createStackNavigator<RootParamList>();

export default function App() {
  useEffect(() => {
    initializeDefaultRecipes();
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="BottomTabs" component={AppNavigator} />
        <RootStack.Screen name="AddRecipeScreen" component={AddRecipeScreen} />
        <RootStack.Screen
          name="RecipeDetailScreen"
          component={RecipeDetailScreen}
        />
        <RootStack.Screen
          name="CookingModeScreen"
          component={CookingModeScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
