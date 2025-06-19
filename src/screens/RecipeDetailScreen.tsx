import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Appbar, List, Chip, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RootParamList } from "../types/navigation";
import { Recipe } from "../types/Recipe";
import {
  getRecipes,
  updateRecipes,
  deleteRecipes,
} from "../services/recipeServices";
import { StackNavigationProp } from "@react-navigation/stack";
import { RecipeDetailScreenStyles } from "../styles/RecipeDetailScreenStyles";

type RecipeDetailScreenRouteProp = RouteProp<
  RootParamList,
  "RecipeDetailScreen"
>;

type RecipeDetailScreenNavigationProp = StackNavigationProp<RootParamList>;

const Colors = {
  primary: "#FF6347",
  accent: "#FFD700",
  background: "#F8F8F8",
  cardBackground: "#FFFFFF",
  text: "#333333",
  lightText: "#666666",
  white: "#FFFFFF",
  darkGray: "#444444",
  mediumGray: "#BBBBBB",
  lightGray: "#EEEEEE",
  error: "#DC3545",
  success: "#28A745",
};

const Typography = {
  fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
  fontSize: {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
    xxxLarge: 40,
  },
  fontWeight: {
    light: "300",
    regular: "400",
    medium: "500",
    bold: "700",
    extraBold: "900",
  },
  body1: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : "Roboto",
  },
};

const Spacing = {
  xSmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 40,
};

export default function RecipeDetailScreen() {
  const navigation = useNavigation<RecipeDetailScreenNavigationProp>();
  const route = useRoute<RecipeDetailScreenRouteProp>();
  const { recipeId } = route.params;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRecipeDetails = useCallback(async () => {
    setLoading(true);
    try {
      const loadedRecipes = await getRecipes();
      const foundRecipe = loadedRecipes.find((r) => r.id === recipeId);

      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        Alert.alert("Hata", "Tarif Bulunamadı");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Hata", "Tarif detayları yüklenirken bir sorun oluştu.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [recipeId, navigation]);

  useFocusEffect(
    useCallback(() => {
      loadRecipeDetails();
      return () => {
        setLoading(true);
        setRecipe(null);
      };
    }, [loadRecipeDetails])
  );

  const handleToggleFavorite = async () => {
    if (!recipe) return;

    try {
      const updatedRecipe = {
        ...recipe,
        isFavorite: !recipe.isFavorite,
      };
      await updateRecipes(updatedRecipe);
      setRecipe(updatedRecipe);
    } catch (error) {
      Alert.alert("Hata", "Favori durumu güncellenirken bir sorun oluştu.");
    }
  };

  const handleStartCooking = () => {
    if (recipe && recipe.instructions && recipe.instructions.length > 0) {
      navigation.navigate("CookingModeScreen", { recipeId: recipe.id });
    } else {
      Alert.alert("Hata", "Bu tarifin yapılış adımları bulunmuyor.");
    }
  };
  if (loading) {
    return (
      <View style={RecipeDetailScreenStyles.loadingContainer}>
        <Text style={Typography.body1}>Tarif yükleniyor...</Text>
      </View>
    );
  }
  if (!recipe) {
    return (
      <View style={RecipeDetailScreenStyles.container}>
        <Text style={Typography.body1}>Tarif bilgisi alınamadı.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{ marginTop: Spacing.medium }}
          theme={{ colors: { primary: Colors.primary } }}
        >
          Geri Dön
        </Button>
      </View>
    );
  }

  const handleRecipeDelete = () => {
    if (!recipe) {
      Alert.alert("Tarif Yok", "Silinecek Tarif Bulunamadı");
      return;
    }

    Alert.alert(
      "Tarifi Sil",
      `${recipe.title} tarifini silmek istiyor musunuz?`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          onPress: async () => {
            try {
              await deleteRecipes(recipe.id);
              Alert.alert("Tarif Silindi", "Tarif Başarıyla Silindi");
              navigation.navigate("BottomTabs", {
                screen: "HomeScreen",
                params: {
                  screen: "HomeInitial",
                },
              });
            } catch (error) {
              console.error("Tarif Silinmedi");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleRecipeEdit = () => {
    if (recipe) {
      navigation.navigate("AddRecipeScreen", { recipeToEdit: recipe });
    } else {
      Alert.alert("Tarif Bulunamadı", "İlgili Tarif Bulunamadı");
    }
  };

  return (
    <View style={RecipeDetailScreenStyles.container}>
      <Appbar.Header style={RecipeDetailScreenStyles.appBar}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={Colors.white}
        />

        <Appbar.Content
          title={recipe.title}
          titleStyle={RecipeDetailScreenStyles.appBarTitle}
        />

        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={RecipeDetailScreenStyles.favoriteButton}
        >
          <MaterialCommunityIcons
            name={recipe.isFavorite ? "heart" : "heart-outline"}
            color={recipe.isFavorite ? Colors.accent : Colors.white}
            size={28}
          />
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={RecipeDetailScreenStyles.scrollViewContent}
      >
        {recipe.photos && recipe.photos.length > 0 && (
          <Image
            source={{ uri: recipe.photos[0] }}
            style={RecipeDetailScreenStyles.mainImage}
          />
        )}

        <View style={RecipeDetailScreenStyles.headerContainer}>
          <Text style={RecipeDetailScreenStyles.title}>{recipe.title}</Text>
          {recipe.description && (
            <Text style={RecipeDetailScreenStyles.description}>
              {recipe.description}
            </Text>
          )}

          <View style={RecipeDetailScreenStyles.infoRow}>
            {recipe.prepTime !== undefined && recipe.prepTime > 0 && (
              <Text style={RecipeDetailScreenStyles.infoText}>
                Hazırlık: {recipe.prepTime} dk
              </Text>
            )}
            {recipe.cookTime !== undefined && recipe.cookTime > 0 && (
              <Text style={RecipeDetailScreenStyles.infoText}>
                Pişirme: {recipe.cookTime} dk
              </Text>
            )}
            {recipe.servings !== undefined && recipe.servings > 0 && (
              <Text style={RecipeDetailScreenStyles.infoText}>
                Kişilik: {recipe.servings}
              </Text>
            )}
          </View>
        </View>

        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <List.Section style={RecipeDetailScreenStyles.section}>
            <List.Subheader style={RecipeDetailScreenStyles.sectionHeader}>
              Malzemeler
            </List.Subheader>
            {recipe.ingredients.map((item, index) => (
              <List.Item
                key={index}
                title={
                  typeof item === "string"
                    ? item
                    : `${item.quantity ? item.quantity + " " : ""}${item.name}`
                }
                left={() => (
                  <List.Icon icon="food-apple" color={Colors.primary} />
                )}
                titleStyle={RecipeDetailScreenStyles.listItemText}
                style={RecipeDetailScreenStyles.listItem}
              />
            ))}
          </List.Section>
        )}

        {recipe.instructions && recipe.instructions.length > 0 && (
          <List.Section style={RecipeDetailScreenStyles.section}>
            <List.Subheader style={RecipeDetailScreenStyles.sectionHeader}>
              Yapılışı
            </List.Subheader>
            {recipe.instructions.map((item, index) => (
              <List.Item
                key={index}
                title={
                  typeof item === "string"
                    ? `${index + 1}. ${item}`
                    : `${index + 1}. ${item.step}`
                }
                titleNumberOfLines={0}
                titleStyle={RecipeDetailScreenStyles.listItemText}
                style={RecipeDetailScreenStyles.listItem}
              />
            ))}
          </List.Section>
        )}

        {recipe.categories && recipe.categories.length > 0 && (
          <View style={RecipeDetailScreenStyles.section}>
            <Text style={RecipeDetailScreenStyles.sectionHeader}>
              Kategoriler:
            </Text>
            <View style={RecipeDetailScreenStyles.chipContainer}>
              {recipe.categories.map((category, index) => (
                <Chip
                  key={index}
                  style={RecipeDetailScreenStyles.chip}
                  textStyle={RecipeDetailScreenStyles.chipText}
                  theme={{
                    colors: { primary: Colors.primary, onSurface: Colors.text },
                  }}
                >
                  {category}
                </Chip>
              ))}
            </View>
          </View>
        )}

        {recipe.tags && recipe.tags.length > 0 && (
          <View style={RecipeDetailScreenStyles.section}>
            <Text style={RecipeDetailScreenStyles.sectionHeader}>
              Etiketler:
            </Text>
            <View style={RecipeDetailScreenStyles.chipContainer}>
              {recipe.tags.map((tag, index) => (
                <Chip
                  key={index}
                  style={RecipeDetailScreenStyles.chip}
                  textStyle={RecipeDetailScreenStyles.chipText}
                  theme={{
                    colors: { primary: Colors.primary, onSurface: Colors.text },
                  }}
                >
                  {tag}
                </Chip>
              ))}
            </View>
          </View>
        )}

        {recipe.createdAt && (
          <Text style={RecipeDetailScreenStyles.dateText}>
            Eklenme: {new Date(recipe.createdAt).toLocaleDateString()}
          </Text>
        )}
        {recipe.updatedAt && (
          <Text style={RecipeDetailScreenStyles.dateText}>
            Son Güncelleme: {new Date(recipe.updatedAt).toLocaleDateString()}
          </Text>
        )}
      </ScrollView>

      {recipe.instructions && recipe.instructions.length > 0 && (
        <Button
          mode="contained"
          icon="chef-hat"
          onPress={handleStartCooking}
          style={RecipeDetailScreenStyles.startButton}
          labelStyle={RecipeDetailScreenStyles.startButtonLabel}
          theme={{
            colors: { primary: Colors.primary, onPrimary: Colors.white },
          }}
        >
          Tarifi Yap
        </Button>
      )}

      <Button
        icon="delete"
        onPress={handleRecipeDelete}
        style={RecipeDetailScreenStyles.deleteButton}
        labelStyle={RecipeDetailScreenStyles.deleteButtonLabel}
        theme={{ colors: { primary: Colors.error, onSurface: Colors.error } }}
      >
        Tarifi Sil
      </Button>

      <Button
        icon="pencil-outline"
        onPress={handleRecipeEdit}
        style={RecipeDetailScreenStyles.editButton}
        labelStyle={RecipeDetailScreenStyles.editButtonLabel}
        theme={{
          colors: { primary: Colors.primary, onSurface: Colors.primary },
        }}
      >
        Tarifi Düzenle
      </Button>
    </View>
  );
}
