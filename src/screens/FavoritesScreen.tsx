import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Searchbar, Card } from "react-native-paper";
import {
  useNavigation,
  useIsFocused,
  NavigationProp,
} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { RootParamList } from "../types/navigation";
import { Recipe } from "../types/Recipe";
import { getRecipes, updateRecipes } from "../services/recipeServices";
import { FavoritesScreenStyles } from "../styles/FavoritesScreenStyles";

export default function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState<
    Recipe[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFavoriteRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      const allStoredRecipes = await getRecipes();
      const filtered = allStoredRecipes.filter((al) => al.isFavorite);
      setFavoriteRecipes(filtered);
      setFilteredFavoriteRecipes(filtered);
    } catch (error) {
      console.log(error);
      setFavoriteRecipes([]);
      setFilteredFavoriteRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadFavoriteRecipes();
    }
  }, [isFocused, loadFavoriteRecipes]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = favoriteRecipes.filter(
      (r) =>
        r.title.toLowerCase().includes(lowerCaseQuery) ||
        (r.categories &&
          r.categories.some((cat) =>
            cat.toLowerCase().includes(lowerCaseQuery)
          )) ||
        (r.tags &&
          r.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)))
    );

    setFilteredFavoriteRecipes(filtered);
  }, [searchQuery, favoriteRecipes]);

  const handleRecipePress = (id: string) => {
    navigation.navigate("RecipeDetailScreen", { recipeId: id });
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const recipeToToggle = favoriteRecipes.find((recipe) => recipe.id === id);
      if (recipeToToggle) {
        const updatedRecipe = {
          ...recipeToToggle,
          isFavorite: !recipeToToggle.isFavorite,
        };
        await updateRecipes(updatedRecipe);
        loadFavoriteRecipes();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update favorite status.");
    }
  };

  const Colors = {
    accent: "#FFD700",
    white: "#FFFFFF",
  };
  return (
    <View style={FavoritesScreenStyles.mainContainer}>
      <Searchbar
        placeholder="Search in favorite recipes..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={FavoritesScreenStyles.searchBar}
        inputStyle={FavoritesScreenStyles.searchBarInput}
      />

      {isLoading ? (
        <View style={FavoritesScreenStyles.loadingContainer}>
          <Text style={FavoritesScreenStyles.loadingText}>
            Loading favorites...
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={FavoritesScreenStyles.recipesGrid}>
          {filteredFavoriteRecipes.length > 0 ? (
            filteredFavoriteRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                style={FavoritesScreenStyles.recipeCard}
                onPress={() => handleRecipePress(recipe.id)}
              >
                {recipe.photos && recipe.photos.length > 0 ? (
                  <Card.Cover
                    source={{ uri: recipe.photos[0] }}
                    style={FavoritesScreenStyles.cardCover}
                  />
                ) : (
                  <View style={FavoritesScreenStyles.noImagePlaceholder}>
                    <Text style={FavoritesScreenStyles.noImageText}>
                      No Image Available
                    </Text>
                  </View>
                )}
                <View style={FavoritesScreenStyles.favoriteIconContainer}>
                  <TouchableOpacity
                    onPress={() => handleToggleFavorite(recipe.id)}
                  >
                    <MaterialCommunityIcons
                      name={recipe.isFavorite ? "heart" : "heart-outline"}
                      color={recipe.isFavorite ? Colors.accent : Colors.white}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>

                <Card.Content style={FavoritesScreenStyles.cardContent}>
                  <Text
                    style={FavoritesScreenStyles.cardTitle}
                    numberOfLines={2}
                  >
                    {recipe.title}
                  </Text>
                  <View style={FavoritesScreenStyles.timeContainer}>
                    {recipe.prepTime !== undefined && recipe.prepTime > 0 && (
                      <View style={FavoritesScreenStyles.timeItem}>
                        <Text style={FavoritesScreenStyles.timeText}>
                          {recipe.prepTime} min prep.
                        </Text>
                      </View>
                    )}
                    {recipe.cookTime !== undefined && recipe.cookTime > 0 && (
                      <View style={FavoritesScreenStyles.timeItem}>
                        <Text style={FavoritesScreenStyles.timeText}>
                          {recipe.cookTime} min cook.
                        </Text>
                      </View>
                    )}
                  </View>
                  {recipe.servings !== undefined && (
                    <Text style={FavoritesScreenStyles.servingsText}>
                      {recipe.servings} servings
                    </Text>
                  )}
                </Card.Content>
              </Card>
            ))
          ) : (
            <View style={FavoritesScreenStyles.noFavoritesContainer}>
              <Text style={FavoritesScreenStyles.noFavoritesText}>
                You don't have any favorite recipes yet!
              </Text>
              <Text style={FavoritesScreenStyles.noFavoritesSubText}>
                You can add recipes here by tapping the heart icon.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
