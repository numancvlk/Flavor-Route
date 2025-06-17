import { View, ScrollView, Image } from "react-native";
import { useState } from "react";
import { TextInput, Button, Text, IconButton, Chip } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

//------------INTERFACES---------------
import { Recipe, Ingredient, Instruction } from "../types/Recipe";
import { addRecipes } from "../services/recipeServices";

//--------------STYLES-----------------------
import AddRecipeScreenStyles from "../styles/AddRecipeScreenStyles";
import { Colors } from "../styles/globalStyles";

const predefinedCategories = [
  "Snacks",
  "Appetizers",
  "Mezes",
  "Baked Goods",
  "Seafood",
  "Meat Dishes",
  "Chicken Dishes",
  "Vegetable Dishes",
  "Vegan Options",
  "Vegetarian Options",
  "Gluten-Free Items",
  "Kids Menu",
  "Sides",
  "Sandwiches",
  "Burgers",
  "Pizza",
  "Pasta",
  "Desserts",
  "Cold Beverages",
  "Hot Beverages",
  "Today's Menu",
  "New Arrivals",
  "Popular Items",
  "Discounted Items",
];
const predefinedTags = [
  "Ready in 5 Minutes",
  "Ready in 10 Minutes",
  "Ready in 15 Minutes",
  "Very Easy",
  "Medium Level",
  "Hard",
  "Tastes Like Store-Bought",
  "Baked",
  "On the Stove",
  "Fried",
  "Boiled",
  "Grilled",
  "Steamed",
  "Raw",
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Sugar-Free",
  "Low Carb",
  "Practical",
  "Budget-Friendly",
  "Filling",
  "Few Ingredients",
  "One-Pot",
  "For Breakfast",
  "For Dinner",
  "For Lunch",
  "Snack",
  "Quick & Easy",
  "With Meat",
  "With Chicken",
  "Olive Oil-Based",
  "Low Calorie",
  "Kid-Friendly",
  "Holiday Dish",
  "Special Occasion",
  "Classic",
  "Innovative",
  "Seasonal",
  "No Oven Needed",
  "For Guests",
  "Healthy",
  "Fast",
  "Easy",
];

export default function AddRecipeScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prepTime, setPrepTime] = useState<number>();
  const [cookTime, setCookTime] = useState<number>();
  const [servings, setServings] = useState<number>();
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);
  const [instruction, setInstruction] = useState<Instruction[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);

  const handlePrepTime = (text: string) => {
    if (text === "") {
      setPrepTime(undefined);
      return;
    } else {
      const numericPrep = parseInt(text, 10);
      setPrepTime(numericPrep);
    }
  };

  const handleCookTime = (text: string) => {
    if (text === "") {
      setCookTime(undefined);
      return;
    } else {
      const numericCook = parseInt(text);
      setCookTime(numericCook);
    }
  };

  const handleServings = (text: string) => {
    if (text === "") {
      setServings(undefined);
      return;
    } else {
      const numericServings = parseInt(text);
      setServings(numericServings);
    }
  };
  //-------------INGREDIENTS ADD REMOVE---------------
  const handleAddIngredient = () => {
    setIngredient([
      ...ingredient,
      { id: uuidv4(), quantity: "", unit: "", name: "" },
    ]);
  };

  const handleIngredientChange = (
    id: string,
    field: keyof Ingredient,
    value: string
  ) => {
    if (field === "unit") {
      if (/^\d+(\.\d+)?$/.test(value.trim()) && value.trim() !== "") {
        alert(
          "Numeric values are not allowed in the unit field. Please enter units such as 'g', 'pieces', etc."
        );
        return;
      }
    }

    if (field === "quantity") {
      if (value.trim() !== "" && !/^\d+(\.\d+)?$/.test(value.trim())) {
        alert(
          "Only numeric values (e.g., 2, 0.5) can be entered in the amount field."
        );
        return;
      }
    }

    if (field === "name") {
      if (/^\d+$/.test(value.trim()) && value.trim() !== "") {
        alert(
          "Only numbers cannot be entered in the ingredient name field. Please enter the name of the ingredient (e.g., Tomato, Flour)."
        );
        return;
      }
    }
    setIngredient((prevIngredients) =>
      prevIngredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    );
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredient((prevIngredients) =>
      prevIngredients.filter((ing) => ing.id !== id)
    );
  };

  //-----------------INSTRUCTIONS ADD REMOVE---------------
  const handleAddInstruction = () => {
    setInstruction([...instruction, { id: uuidv4(), step: "" }]);
  };

  const handleInstructionChange = (id: string, value: string) => {
    setInstruction((prevInstructions) =>
      prevInstructions.map((ins) =>
        ins.id === id ? { ...ins, step: value } : ins
      )
    );
  };

  const handleRemoveInstruction = (id: string) => {
    setInstruction((prevInstructions) =>
      prevInstructions.filter((ins) => ins.id !== id)
    );
  };

  //-----------SELECT PHOTOS---------------
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Media Access Required");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
    }
  };

  //-------------CATEGORY and TAGS------------------
  const handleTag = (tag: string) => {
    setTag((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleCategory = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  //-------------SAVE BUTTON-----------------
  const handleSaveRecipe = async () => {
    if (title === "") {
      alert("The title cannot be left empty!");
      return;
    }
    const filteredIngredients = ingredient.filter(
      (ing) => ing.name.trim() !== ""
    );
    if (filteredIngredients.length === 0) {
      alert("Please enter an ingredient name.");
      return;
    }

    const filteredInstructions = instruction.filter(
      (ins) => ins.step.trim() !== ""
    );
    if (filteredInstructions.length === 0) {
      alert("Please enter the instructions.");
      return;
    }

    const newRecipe: Omit<Recipe, "id" | "createdAt" | "updatedAt"> = {
      title: title.trim(),
      description: description.trim() || undefined,
      prepTime: prepTime,
      cookTime: cookTime,
      servings: servings,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      photos: photos,
      categories: categories,
      tags: tag,
      isFavorite: false,
      isUserAdded: true,
    };

    try {
      await addRecipes(newRecipe);
      alert("Recipe saved successfully.");
      setTitle("");
      setDescription("");
      setPrepTime(undefined);
      setCookTime(undefined);
      setServings(undefined);
      setIngredient([]);
      setInstruction([]);
      setPhotos([]);
      setCategories([]);
      setTag([]);
      navigation.goBack();
    } catch (error) {
      console.log("Recipe Save Error");
      return;
    }
  };

  return (
    <View style={AddRecipeScreenStyles.mainContainer}>
      <ScrollView
        contentContainerStyle={AddRecipeScreenStyles.scrollViewContent}
      >
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={AddRecipeScreenStyles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={AddRecipeScreenStyles.input}
        />
        <TextInput
          placeholder="Prepare Time"
          value={prepTime !== undefined ? String(prepTime) : ""}
          onChangeText={handlePrepTime}
          style={AddRecipeScreenStyles.input}
        />
        <TextInput
          placeholder="Cook Time (min)"
          value={cookTime !== undefined ? String(cookTime) : ""}
          onChangeText={handleCookTime}
          style={AddRecipeScreenStyles.input}
        />
        <TextInput
          placeholder="Servings"
          value={servings !== undefined ? String(servings) : ""}
          onChangeText={handleServings}
          style={AddRecipeScreenStyles.input}
        />
        <Text variant="titleMedium" style={AddRecipeScreenStyles.sectionTitle}>
          Ingredients
        </Text>
        {ingredient.map((ingredient) => (
          <View key={ingredient.id} style={AddRecipeScreenStyles.rowContainer}>
            <TextInput
              label="Amount"
              value={ingredient.quantity}
              onChangeText={(text) =>
                handleIngredientChange(ingredient.id, "quantity", text)
              }
              mode="outlined"
              style={AddRecipeScreenStyles.ingredientInput}
              keyboardType="numeric"
            />
            <TextInput
              label="Unit (g, pcs, cup)"
              value={ingredient.unit}
              onChangeText={(text) =>
                handleIngredientChange(ingredient.id, "unit", text)
              }
              mode="outlined"
              style={AddRecipeScreenStyles.ingredientInput}
            />
            <TextInput
              label="Ingredient Name"
              value={ingredient.name}
              onChangeText={(text) =>
                handleIngredientChange(ingredient.id, "name", text)
              }
              mode="outlined"
              style={AddRecipeScreenStyles.ingredientInput}
            />
            <IconButton
              icon="close-circle"
              size={24}
              onPress={() => handleRemoveIngredient(ingredient.id)}
              accessibilityLabel="Delete Ingredient"
            />
          </View>
        ))}
        <Button
          mode="outlined"
          onPress={handleAddIngredient}
          style={AddRecipeScreenStyles.addButton}
        >
          + Add Ingredient
        </Button>

        <Text variant="titleMedium" style={AddRecipeScreenStyles.sectionTitle}>
          Instructions
        </Text>
        {instruction.map((instruction, index) => (
          <View key={instruction.id} style={AddRecipeScreenStyles.rowContainer}>
            <TextInput
              label={`Step ${index + 1}`}
              value={instruction.step}
              onChangeText={(text) =>
                handleInstructionChange(instruction.id, text)
              }
              mode="outlined"
              style={AddRecipeScreenStyles.instructionInput}
              multiline
              numberOfLines={4}
            />
            <IconButton
              icon="close-circle"
              size={24}
              onPress={() => handleRemoveInstruction(instruction.id)}
              accessibilityLabel="Delete Instruction Step"
            />
          </View>
        ))}
        <Button
          mode="outlined"
          onPress={handleAddInstruction}
          style={AddRecipeScreenStyles.addButton}
        >
          + Add Step
        </Button>

        <Text variant="titleMedium" style={AddRecipeScreenStyles.sectionTitle}>
          Photos
        </Text>
        <Button
          mode="outlined"
          onPress={pickImage}
          style={AddRecipeScreenStyles.addButton}
          labelStyle={{ color: Colors.primary }}
          icon="image-plus"
        >
          Select Photo
        </Button>
        {photos.length > 0 && (
          <View style={AddRecipeScreenStyles.photoPreviewContainer}>
            {photos.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={AddRecipeScreenStyles.photoPreview}
              />
            ))}
          </View>
        )}

        <Text variant="titleMedium" style={AddRecipeScreenStyles.sectionTitle}>
          Categories
        </Text>
        <View style={AddRecipeScreenStyles.chipContainer}>
          {predefinedCategories.map((cat) => (
            <Chip
              key={cat}
              mode="outlined"
              onPress={() => handleCategory(cat)}
              selected={categories.includes(cat)}
              style={[
                AddRecipeScreenStyles.chip,
                categories.includes(cat) && AddRecipeScreenStyles.selectedChip,
              ]}
              textStyle={
                categories.includes(cat) &&
                AddRecipeScreenStyles.selectedChipText
              }
              showSelectedCheck={false}
            >
              {cat}
            </Chip>
          ))}
        </View>

        <Text variant="titleMedium" style={AddRecipeScreenStyles.sectionTitle}>
          Tags
        </Text>
        <View style={AddRecipeScreenStyles.chipContainer}>
          {predefinedTags.map((tagItem) => (
            <Chip
              key={tagItem}
              mode="outlined"
              onPress={() => handleTag(tagItem)}
              selected={tag.includes(tagItem)}
              style={[
                AddRecipeScreenStyles.chip,
                tag.includes(tagItem) && AddRecipeScreenStyles.selectedChip,
              ]}
              textStyle={
                tag.includes(tagItem) && AddRecipeScreenStyles.selectedChipText
              }
              showSelectedCheck={false}
            >
              {tagItem}
            </Chip>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleSaveRecipe}
          style={AddRecipeScreenStyles.addButton}
          icon="content-save"
        >
          Save Recipe
        </Button>
      </ScrollView>
    </View>
  );
}
