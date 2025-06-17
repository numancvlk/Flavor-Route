import { View, Text, Dimensions, ScrollView, Alert } from "react-native";
import { FAB, Card, Appbar, Searchbar } from "react-native-paper";
import {
  useNavigation,
  useIsFocused,
  NavigationProp,
} from "@react-navigation/native";
import { useState, useEffect } from "react";

import { RootParamList } from "../types/navigation";
import { Recipe } from "../types/Recipe";
import { Colors } from "../styles/globalStyles";
import { MyRecipesScreenStyles } from "../styles/MyRecipesScreenStyles";
import { getRecipes, updateRecipes } from "../services/recipeServices";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 15;

export default function MyRecipesScreen() {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState("");
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [filteredUserRecipes, setFilteredUserRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserRecipes = async () => {
    setIsLoading(true);
    try {
      const allStoredRecipes = await getRecipes();
      const filtered = allStoredRecipes.filter((recipe) => recipe.isUserAdded);
      setUserRecipes(filtered);
      setFilteredUserRecipes(filtered);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load your recipes.");
      setUserRecipes([]);
      setFilteredUserRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadUserRecipes();
    }
  }, [isFocused]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = userRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerCaseQuery) ||
        (recipe.categories &&
          recipe.categories.some((cat) =>
            cat.toLowerCase().includes(lowerCaseQuery)
          )) ||
        (recipe.tags &&
          recipe.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)))
    );
    setFilteredUserRecipes(filtered);
  }, [searchQuery, userRecipes]);

  const handleRecipePress = (id: string) => {
    // navigation.navigate("RecipeDetail", { recipeId: id });
    alert("Coming Soon");
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const recipeToToggle = userRecipes.find((recipe) => recipe.id === id);
      if (recipeToToggle) {
        const updatedRecipe = {
          ...recipeToToggle,
          isFavorite: !recipeToToggle.isFavorite,
        };
        await updateRecipes(updatedRecipe);
        loadUserRecipes();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update favorite status.");
    }
  };

  return (
    <View style={MyRecipesScreenStyles.mainContainer}>
      <Searchbar
        placeholder="Search my recipes..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={MyRecipesScreenStyles.searchBar}
        inputStyle={MyRecipesScreenStyles.searchBarInput}
      />

      {isLoading ? (
        <View style={MyRecipesScreenStyles.loadingContainer}>
          <Text style={MyRecipesScreenStyles.loadingText}>
            Loading recipes...
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={MyRecipesScreenStyles.recipesGrid}>
          {filteredUserRecipes.length > 0 ? (
            filteredUserRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                style={MyRecipesScreenStyles.recipeCard}
                onPress={() => handleRecipePress(recipe.id)}
              >
                {recipe.photos && recipe.photos.length > 0 ? (
                  <Card.Cover
                    source={{ uri: recipe.photos[0] }}
                    style={MyRecipesScreenStyles.cardCover}
                  />
                ) : (
                  <View style={MyRecipesScreenStyles.noImagePlaceholder}>
                    <Text style={MyRecipesScreenStyles.noImageText}>
                      No Image Available
                    </Text>
                  </View>
                )}
                <View style={MyRecipesScreenStyles.favoriteIconContainer}>
                  <Appbar.Action
                    icon={recipe.isFavorite ? "heart" : "heart-outline"}
                    color={recipe.isFavorite ? Colors.accent : Colors.white}
                    size={24}
                    onPress={() => handleToggleFavorite(recipe.id)}
                    style={MyRecipesScreenStyles.favoriteIconButton}
                  />
                </View>
                <Card.Content style={MyRecipesScreenStyles.cardContent}>
                  <Text
                    style={MyRecipesScreenStyles.cardTitle}
                    numberOfLines={2}
                  >
                    {recipe.title}
                  </Text>
                  <View style={MyRecipesScreenStyles.timeContainer}>
                    {recipe.prepTime !== undefined && recipe.prepTime > 0 && (
                      <View style={MyRecipesScreenStyles.timeItem}>
                        <Text style={MyRecipesScreenStyles.timeText}>
                          {recipe.prepTime} min prep
                        </Text>
                      </View>
                    )}
                    {recipe.cookTime !== undefined && recipe.cookTime > 0 && (
                      <View style={MyRecipesScreenStyles.timeItem}>
                        <Text style={MyRecipesScreenStyles.timeText}>
                          {recipe.cookTime} min cook
                        </Text>
                      </View>
                    )}
                  </View>
                  {recipe.servings !== undefined && (
                    <Text style={MyRecipesScreenStyles.servingsText}>
                      {recipe.servings} servings
                    </Text>
                  )}
                </Card.Content>
              </Card>
            ))
          ) : (
            <View style={MyRecipesScreenStyles.noRecipesContainer}>
              <Text style={MyRecipesScreenStyles.noRecipesText}>
                You haven't added any recipes yet!
              </Text>
              <Text style={MyRecipesScreenStyles.noRecipesSubText}>
                Tap the '+' button to create your first recipe.
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      <FAB
        style={MyRecipesScreenStyles.fab}
        icon="plus"
        label="Add New Recipe"
        onPress={() => navigation.navigate("AddRecipeScreen")}
        color={Colors.white}
        theme={{ colors: { accent: Colors.primary } }}
      />
    </View>
  );
}
