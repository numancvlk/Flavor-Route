import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../types/navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";

//--------------SCREENS-------------------
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";

const TAB = createBottomTabNavigator<RootParamList>();
const STACK = createStackNavigator<RootParamList>(); // İç içe Stack'ler için

export default function AppNavigator() {
  function HomeStackScreen() {
    return (
      <STACK.Navigator initialRouteName="HomeScreen">
        <STACK.Screen
          name="HomeScreen"
          component={HomeScreen}
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
    </TAB.Navigator>
  );
}
