import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../types/navigation";
//--------------SCREENS-------------------
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";

const TAB = createBottomTabNavigator<RootParamList>();

export default function AppNavigator() {
  return (
    <TAB.Navigator>
      <TAB.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Recipes" }}
      />

      <TAB.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />

      <TAB.Screen
        name="AddRecipeScreen"
        component={AddRecipeScreen}
        options={{ title: "Add Recipe" }}
      />
    </TAB.Navigator>
  );
}
