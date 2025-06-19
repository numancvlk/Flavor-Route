import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  RootParamList,
  HomeStackParamList,
  FavoritesStackParamList,
  MyRecipesStackParamList,
  BottomTabParamList,
} from "../types/navigation";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//--------------SCREENS-------------------
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
const TAB = createBottomTabNavigator<BottomTabParamList>();

function HomeStackScreen() {
  const HomeStack = createStackNavigator<HomeStackParamList>();
  return (
    <HomeStack.Navigator initialRouteName="HomeInitial">
      <HomeStack.Screen
        name="HomeInitial"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function FavoritesStackScreen() {
  const FavoritesStack = createStackNavigator<FavoritesStackParamList>();
  return (
    <FavoritesStack.Navigator initialRouteName="FavoritesInitial">
      <FavoritesStack.Screen
        name="FavoritesInitial"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
    </FavoritesStack.Navigator>
  );
}

function MyRecipesStackScreen() {
  const MyRecipesStack = createStackNavigator<MyRecipesStackParamList>();
  return (
    <MyRecipesStack.Navigator initialRouteName="MyRecipesInitial">
      <MyRecipesStack.Screen
        name="MyRecipesInitial"
        component={MyRecipesScreen}
        options={{ headerShown: false }}
      />
    </MyRecipesStack.Navigator>
  );
}

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
    </TAB.Navigator>
  );
}
