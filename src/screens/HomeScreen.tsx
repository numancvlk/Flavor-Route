import React, { useCallback, useState, useMemo } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { Text, Appbar, Card, Searchbar, FAB } from "react-native-paper";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { RootParamList } from "../types/navigation";
import { DEFAULT_RECIPES } from "../data/defaultRecipes";
import { Recipe } from "../types/Recipe";
import { getRecipes } from "../services/recipeServices";
import HomeScreenStyles from "../styles/HomeScreenStyles";
import { Colors } from "../styles/globalStyles";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadAllRecipesFromStorage = useCallback(async () => {
    setRefreshing(true);
    try {
      const loadedUserRecipes = await getRecipes();
      setUserRecipes(loadedUserRecipes);
    } catch (error) {
      console.log("Tarif Yükleme Hatası");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAllRecipesFromStorage();
    }, [loadAllRecipesFromStorage])
  );

  const allRecipes = useMemo(() => {
    const combined = [...DEFAULT_RECIPES];

    userRecipes.forEach((userRecipe) => {
      const existingDefaultIndex = combined.findIndex(
        (defaultRecipe) => defaultRecipe.id === userRecipe.id
      );

      if (existingDefaultIndex > -1) {
        combined[existingDefaultIndex] = userRecipe;
      } else {
        combined.push(userRecipe);
      }
    });
    return combined;
  }, [userRecipes]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const filteredRecipes = useMemo(() => {
    if (!searchQuery) {
      return allRecipes;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return allRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerCaseQuery) ||
        (recipe.description &&
          recipe.description.toLowerCase().includes(lowerCaseQuery)) ||
        recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(lowerCaseQuery)
        ) ||
        recipe.instructions.some((inst) =>
          inst.step.toLowerCase().includes(lowerCaseQuery)
        ) ||
        recipe.categories.some((cat) =>
          cat.toLowerCase().includes(lowerCaseQuery)
        ) ||
        recipe.tags.some((tagItem) =>
          tagItem.toLowerCase().includes(lowerCaseQuery)
        )
    );
  }, [allRecipes, searchQuery]);

  const handleRecipePress = (recipeId: string) => {
    console.log("Tarif detayı gösterilecek:", recipeId);
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={HomeScreenStyles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadAllRecipesFromStorage}
            tintColor={Colors.primary}
          />
        }
      >
        <Searchbar
          placeholder="Tarif ara..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={HomeScreenStyles.searchBar}
          iconColor={Colors.mediumGray}
          inputStyle={{ color: Colors.text }}
        />

        {filteredRecipes.length === 0 && allRecipes.length > 0 ? (
          <Text style={HomeScreenStyles.noRecipesText}>
            Aradığınız kriterlere uygun tarif bulunamadı.
          </Text>
        ) : filteredRecipes.length === 0 && allRecipes.length === 0 ? (
          <Text style={HomeScreenStyles.noRecipesText}>
            Henüz hiç tarifiniz yok. İlk tarifinizi ekleyin!
          </Text>
        ) : (
          filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              style={HomeScreenStyles.recipeCard}
              onPress={() => handleRecipePress(recipe.id)}
            >
              {recipe.photos && recipe.photos.length > 0 ? (
                <Card.Cover
                  source={{ uri: recipe.photos[0] }}
                  style={HomeScreenStyles.cardCover}
                />
              ) : (
                <View style={HomeScreenStyles.noImagePlaceholder}>
                  <Text style={HomeScreenStyles.noImageText}>Görsel Yok</Text>
                </View>
              )}
              <Card.Content style={HomeScreenStyles.cardContent}>
                <Text style={HomeScreenStyles.cardTitle}>{recipe.title}</Text>
                {recipe.description && (
                  <Text
                    style={HomeScreenStyles.cardParagraph}
                    numberOfLines={2}
                  >
                    {recipe.description}
                  </Text>
                )}
                {recipe.categories.length > 0 && (
                  <Text style={HomeScreenStyles.cardCategory}>
                    Kategori: {recipe.categories.join(", ")}
                  </Text>
                )}
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>

      <FAB
        onPress={() => navigation.navigate("AddRecipeScreen")}
        style={HomeScreenStyles.fab}
        icon="plus"
        label="Yeni Tarif Ekle"
      />
    </View>
  );
}
