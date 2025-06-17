import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Searchbar, FAB } from "react-native-paper";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//-----------DAHİLİ-------------------
import { RootParamList } from "../types/navigation";
import { DEFAULT_RECIPES } from "../data/defaultRecipes";
import { Recipe } from "../types/Recipe";
import { getRecipes, updateRecipes } from "../services/recipeServices";
import HomeScreenStyles from "../styles/HomeScreenStyles";
import { Colors } from "../styles/globalStyles";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadAllRecipesFromStorage = useCallback(async () => {
    setRefreshing(true);
    try {
      const loadedUserRecipes = await getRecipes();
      const combined = [...DEFAULT_RECIPES];
      loadedUserRecipes.forEach((userRecipe) => {
        const existingDefaultIndex = combined.findIndex(
          (defaultRecipe) => defaultRecipe.id === userRecipe.id
        );
        if (existingDefaultIndex > -1) {
          combined[existingDefaultIndex] = userRecipe;
        } else {
          combined.push(userRecipe);
        }
      });

      setRecipes(combined);
      setUserRecipes(loadedUserRecipes);
    } catch (error) {
      console.log("Recipe Upload Error");
      setRecipes([]);
      setUserRecipes([]);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAllRecipesFromStorage();
    }, [loadAllRecipesFromStorage])
  );

  const allRecipesDisplay = useMemo(() => {
    return recipes;
  }, [recipes]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const filteredRecipes = useMemo(() => {
    if (!searchQuery) {
      return allRecipesDisplay;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return allRecipesDisplay.filter(
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
  }, [allRecipesDisplay, searchQuery]);

  const handleRecipePress = (recipeId: string) => {
    console.log("Recipe details will be shown:", recipeId);
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const recipeToToggle = recipes.find((recipe) => recipe.id === id);
      if (recipeToToggle) {
        const updatedRecipe = {
          ...recipeToToggle,
          isFavorite: !recipeToToggle.isFavorite,
        };
        await updateRecipes(updatedRecipe);
        loadAllRecipesFromStorage();
      }
    } catch (error) {
      console.error(error);
      alert("Error");
    }
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
          placeholder="Search recipe..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={HomeScreenStyles.searchBar}
          iconColor={Colors.mediumGray}
          inputStyle={{ color: Colors.text }}
        />

        {filteredRecipes.length === 0 && allRecipesDisplay.length > 0 ? (
          <Text style={HomeScreenStyles.noRecipesText}>
            No recipes found matching your criteria.
          </Text>
        ) : filteredRecipes.length === 0 && allRecipesDisplay.length === 0 ? (
          <Text style={HomeScreenStyles.noRecipesText}>
            You don't have any recipes yet. Add your first recipe!
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
                  <Text style={HomeScreenStyles.noImageText}>
                    No Image Available
                  </Text>
                </View>
              )}

              <View style={HomeScreenStyles.favoriteIconContainer}>
                <TouchableOpacity
                  onPress={() => handleToggleFavorite(recipe.id)}
                >
                  <MaterialCommunityIcons
                    name={recipe.isFavorite ? "heart" : "heart-outline"} // Favori ise dolu, değilse boş kalp
                    color={recipe.isFavorite ? Colors.accent : Colors.white}
                    size={24}
                  />
                </TouchableOpacity>
              </View>

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
                    Category:{recipe.categories.join(", ")}
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
        label="Add New Recipe"
      />
    </View>
  );
}
