import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./src/navigation/AppNavigator";
import AddRecipeScreen from "./src/screens/AddRecipeScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import CookingModeScreen from "./src/screens/CookingModeScreen";

import { RootParamList } from "./src/types/navigation";

const RootStack = createStackNavigator<RootParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="BottomTabs"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AddRecipeScreen"
          component={AddRecipeScreen}
          options={{ title: "Add New Recipes" }}
        />
        <RootStack.Screen
          name="RecipeDetailScreen"
          component={RecipeDetailScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="CookingModeScreen"
          component={CookingModeScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
