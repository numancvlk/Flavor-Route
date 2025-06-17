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
import { Colors } from "../styles/globalStyles";
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
    // navigation.navigate("RecipeDetail", { recipeId: id });
    alert("Coming Soon");
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
      console.error(error);
      Alert.alert("Error", "Failed to update favorite status.");
    }
  };
  return (
    <View style={FavoritesScreenStyles.mainContainer}>
      <Searchbar
        placeholder="Favori tariflerde ara..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={FavoritesScreenStyles.searchBar}
        inputStyle={FavoritesScreenStyles.searchBarInput}
      />

      {isLoading ? (
        <View style={FavoritesScreenStyles.loadingContainer}>
          <Text style={FavoritesScreenStyles.loadingText}>
            Favoriler yükleniyor...
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
                      Fotoğraf Yok
                    </Text>
                  </View>
                )}
                {/* FAVORİ İKONU İÇİN GÜNCEL YAPI */}
                <View style={FavoritesScreenStyles.favoriteIconContainer}>
                  <TouchableOpacity
                    onPress={() => handleToggleFavorite(recipe.id)}
                  >
                    <MaterialCommunityIcons
                      // Her zaman dolu kalp gösterir, çünkü zaten favori olanları listeliyoruz.
                      // Tıklandığında listeden gideceği için dolu kalp yeterli.
                      name={"heart"}
                      color={Colors.accent} // Dolu kalp ikon rengi (örneğin pembe/turkuaz)
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
                {/* FAVORİ İKONU YAPISI SONU */}

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
                          {recipe.prepTime} dk haz.
                        </Text>
                      </View>
                    )}
                    {recipe.cookTime !== undefined && recipe.cookTime > 0 && (
                      <View style={FavoritesScreenStyles.timeItem}>
                        <Text style={FavoritesScreenStyles.timeText}>
                          {recipe.cookTime} dk piş.
                        </Text>
                      </View>
                    )}
                  </View>
                  {recipe.servings !== undefined && (
                    <Text style={FavoritesScreenStyles.servingsText}>
                      {recipe.servings} kişilik
                    </Text>
                  )}
                </Card.Content>
              </Card>
            ))
          ) : (
            <View style={FavoritesScreenStyles.noFavoritesContainer}>
              <Text style={FavoritesScreenStyles.noFavoritesText}>
                Henüz favori tarifiniz yok!
              </Text>
              <Text style={FavoritesScreenStyles.noFavoritesSubText}>
                Tarifleri kalp ikonuna dokunarak buraya ekleyebilirsiniz.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
