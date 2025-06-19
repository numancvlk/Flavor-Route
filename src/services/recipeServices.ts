import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../types/Recipe";

const RECIPES_KEY = "MYRECIPES";
export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(RECIPES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log("GetRecipes Hata");

    return [];
  }
};

export const saveRecipes = async (recipes: Recipe[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(recipes);
    await AsyncStorage.setItem(RECIPES_KEY, jsonValue);
  } catch (error) {
    console.log("SaveRecipes Hata");
  }
};

export const addRecipes = async (
  recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt">
): Promise<Recipe> => {
  try {
    const currentRecipes = await getRecipes();
    const now = new Date().toISOString();

    const recipeToAdd: Recipe = {
      ...recipeData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };

    const updatedRecipes = [...currentRecipes, recipeToAdd];
    await saveRecipes(updatedRecipes);
    console.log(updatedRecipes);
    return recipeToAdd;
  } catch (error) {
    console.log("AddRecipes Hata");
    throw error;
  }
};

export const updateRecipes = async (updatedRecipe: Recipe): Promise<void> => {
  try {
    const currentRecipes = await getRecipes();
    const now = new Date().toISOString();

    let recipeFound = false;
    const newRecipes = currentRecipes.map((recipe) => {
      if (recipe.id === updatedRecipe.id) {
        recipeFound = true;

        return {
          ...updatedRecipe,
          updatedAt: now,
          isUserAdded: updatedRecipe.isUserAdded ?? false,
        };
      }
      return recipe;
    });

    if (!recipeFound) {
      const recipeToSave = {
        ...updatedRecipe,
        updatedAt: now,
        isUserAdded: updatedRecipe.isUserAdded ?? false,
      };
      newRecipes.push(recipeToSave);
    }

    await saveRecipes(newRecipes);
  } catch (error) {
    console.error("UpdateRecipes Hata:", error);
  }
};

export const deleteRecipes = async (recipeId: string): Promise<void> => {
  try {
    const currentRecipes = await getRecipes();
    const remainingRecipes = currentRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    await saveRecipes(remainingRecipes);
  } catch (error) {
    console.log("DeleteRecipes Hata");
  }
};
