import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../types/navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//--------------SCREENS-------------------
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";

const TAB = createBottomTabNavigator<RootParamList>();

export default function AppNavigator() {
  return (
    <TAB.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6346",
        tabBarInactiveTintColor: "#999999",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5,
        },
      }}
    >
      <TAB.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <TAB.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />

      <TAB.Screen
        name="MyRecipesScreen"
        component={MyRecipesScreen}
        options={{
          title: "My Recipes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="notebook-multiple"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <TAB.Screen
        name="AddRecipeScreen"
        component={AddRecipeScreen}
        options={{
          title: "Add Recipe",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </TAB.Navigator>
  );
}
