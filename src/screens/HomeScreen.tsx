import { View } from "react-native";
import { Text, Appbar } from "react-native-paper";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { RootParamList } from "../types/navigation";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Tariflerim" />
        <Appbar.Action
          onPress={() => navigation.navigate("AddRecipeScreen")}
          icon="plus"
        />
      </Appbar.Header>
      <Text variant="headlineMedium">HomeScreen</Text>
    </View>
  );
}
