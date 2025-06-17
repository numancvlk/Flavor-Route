import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../types/navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
//--------------SCREENS-------------------
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import CookingModeScreen from "../screens/CookingModeScreen";

const TAB = createBottomTabNavigator<RootParamList>();
const STACK = createStackNavigator<RootParamList>();

export default function AppNavigator() {
  function HomeStackScreen() {
    return (
      <STACK.Navigator initialRouteName="HomeScreen">
        <STACK.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="RecipeDetailScreen"
          component={RecipeDetailScreen}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="CookingModeScreen"
          component={CookingModeScreen}
          options={{ headerShown: false }}
        />
      </STACK.Navigator>
    );
  }

  function FavoritesStackScreen() {
    return (
      <STACK.Navigator initialRouteName="FavoritesScreen">
        <STACK.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="RecipeDetailScreen"
          component={RecipeDetailScreen}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="CookingModeScreen"
          component={CookingModeScreen}
          options={{ headerShown: false }}
        />
      </STACK.Navigator>
    );
  }

  function MyRecipesStackScreen() {
    return (
      <STACK.Navigator initialRouteName="MyRecipesScreen">
        <STACK.Screen
          name="MyRecipesScreen"
          component={MyRecipesScreen}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="RecipeDetailScreen"
          component={RecipeDetailScreen}
          options={{ headerShown: false }}
        />
        <STACK.Screen
          name="CookingModeScreen"
          component={CookingModeScreen}
          options={{ headerShown: false }}
        />
      </STACK.Navigator>
    );
  }

  function AddRecipeStackScreen() {
    return (
      <STACK.Navigator initialRouteName="AddRecipeScreen">
        <STACK.Screen
          name="AddRecipeScreen"
          component={AddRecipeScreen}
          options={{ headerShown: false }}
        />
      </STACK.Navigator>
    );
  }

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
        component={HomeStackScreen}
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
        component={FavoritesStackScreen}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />

      <TAB.Screen
        name="MyRecipesScreen"
        component={MyRecipesStackScreen}
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
        component={AddRecipeStackScreen}
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
