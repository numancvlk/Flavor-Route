import { View, ScrollView, Image, Alert } from "react-native";
import { useCallback, useState } from "react";
import { TextInput, Button, Text, IconButton, Chip } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";

//------------INTERFACES---------------
import { Recipe, Ingredient, Instruction } from "../types/Recipe";
import { addRecipes, updateRecipes } from "../services/recipeServices";
import { RootParamList } from "../types/navigation";
//--------------STYLES-----------------------
import { AddRecipeScreenStyles } from "../styles/AddRecipeScreenStyles";

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
type AddRecipeScreenRouteProp = RouteProp<RootParamList, "AddRecipeScreen">;
type AddRecipeScreenNavigationProp = StackNavigationProp<
  RootParamList,
  "AddRecipeScreen"
>;
export default function AddRecipeScreen() {
  const route = useRoute<AddRecipeScreenRouteProp>();
  const navigation = useNavigation<AddRecipeScreenNavigationProp>();
  const recipeToEdit = route.params?.recipeToEdit;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string | undefined>();
  const [cookTime, setCookTime] = useState<string | undefined>();
  const [servings, setServings] = useState<string | undefined>();
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);
  const [instruction, setInstruction] = useState<Instruction[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);

  const [newInstructionStep, setNewInstructionStep] = useState<string>("");
  const [currentInstructionPhoto, setCurrentInstructionPhoto] = useState<
    string | null
  >(null);
  const [currentInstructionTimer, setCurrentInstructionTimer] =
    useState<string>("");

  const handleNumericInput = (
    text: string,
    setState: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    if (text === "" || /^\d*\.?\d*$/.test(text)) {
      setState(text);
    } else {
      Alert.alert("Error", "Please enter numbers only.");
    }
  };
  const handlePrepTime = (text: string) =>
    handleNumericInput(text, setPrepTime);
  const handleCookTime = (text: string) =>
    handleNumericInput(text, setCookTime);
  const handleServings = (text: string) =>
    handleNumericInput(text, setServings);

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
        Alert.alert(
          "Validation Error",
          "Numeric values are not allowed in the unit field. Please enter units such as 'g', 'pieces', etc."
        );
        return;
      }
    }

    if (field === "quantity") {
      if (value.trim() !== "" && !/^\d+(\.\d+)?$/.test(value.trim())) {
        Alert.alert(
          "Validation Error",
          "Only numeric values (e.g., 2, 0.5) can be entered in the amount field."
        );
        return;
      }
    }

    if (field === "name") {
      if (/^\d+$/.test(value.trim()) && value.trim() !== "") {
        Alert.alert(
          "Validation Error",
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
    if (newInstructionStep.trim() === "") {
      Alert.alert("Warning", "Instruction step cannot be empty.");
      return;
    }

    const newInstruction: Instruction = {
      id: uuidv4(),
      step: newInstructionStep.trim(),
    };

    if (currentInstructionPhoto) {
      newInstruction.photoUri = currentInstructionPhoto;
    }
    const timerVal = parseFloat(currentInstructionTimer);
    if (!isNaN(timerVal) && timerVal > 0) {
      newInstruction.timerDuration = timerVal * 60;
    }

    setInstruction((prevInstructions) => [...prevInstructions, newInstruction]);

    setNewInstructionStep("");
    setCurrentInstructionPhoto(null);
    setCurrentInstructionTimer("");
  };

  const handleInstructionChange = (
    id: string,
    field: keyof Instruction,
    value: string | number | undefined
  ) => {
    setInstruction((prevInstructions) =>
      prevInstructions.map((ins) =>
        ins.id === id ? { ...ins, [field]: value } : ins
      )
    );
  };

  const handleRemoveInstruction = (id: string) => {
    setInstruction((prevInstructions) =>
      prevInstructions.filter((ins) => ins.id !== id)
    );
  };

  //-----------SELECT PHOTOS---------------
  const pickImage = async (
    isInstructionPhoto: boolean = false,
    instructionId?: string
  ) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Media Access Required",
        "Please grant access to your photo library to select images."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      if (isInstructionPhoto && instructionId) {
        handleInstructionChange(instructionId, "photoUri", selectedUri);
      } else if (isInstructionPhoto && !instructionId) {
        setCurrentInstructionPhoto(selectedUri);
      } else {
        setPhotos([selectedUri]);
      }
    }
  };

  //-------------CATEGORY and TAGS------------------
  const handleTag = (tagItem: string) => {
    setTag((prevTags) =>
      prevTags.includes(tagItem)
        ? prevTags.filter((t) => t !== tagItem)
        : [...prevTags, tagItem]
    );
  };

  const handleCategory = (categoryItem: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(categoryItem)
        ? prevCategories.filter((c) => c !== categoryItem)
        : [...prevCategories, categoryItem]
    );
  };

  const handleSaveRecipe = async () => {
    if (title === "") {
      Alert.alert("Validation Error", "The title cannot be left empty!");
      return;
    }
    const filteredIngredients = ingredient.filter(
      (ing) => ing.name.trim() !== ""
    );
    if (filteredIngredients.length === 0) {
      Alert.alert(
        "Validation Error",
        "Please enter at least one ingredient name."
      );
      return;
    }

    const filteredInstructions = instruction.filter(
      (ins) => ins.step.trim() !== ""
    );
    if (filteredInstructions.length === 0) {
      Alert.alert(
        "Validation Error",
        "Please enter at least one instruction step."
      );
      return;
    }

    const commonRecipeData = {
      title: title.trim(),
      description: description.trim() || undefined,
      prepTime: prepTime ? parseInt(prepTime, 10) : undefined,
      cookTime: cookTime ? parseInt(cookTime, 10) : undefined,
      servings: servings ? parseInt(servings, 10) : undefined,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      photos: photos,
      categories: categories,
      tags: tag,
      isFavorite: recipeToEdit?.isFavorite ?? false,
      isUserAdded: true,
    };

    try {
      if (recipeToEdit) {
        const updatedRecipe: Recipe = {
          ...commonRecipeData,
          id: recipeToEdit.id,
          createdAt: recipeToEdit.createdAt,
          updatedAt: new Date().toISOString(),
        };
        await updateRecipes(updatedRecipe);
        Alert.alert("Success", "Recipe updated successfully.");
      } else {
        const newRecipe = await addRecipes(commonRecipeData);
        Alert.alert("Success", "Recipe saved successfully.");
      }

      // Başarılı kayıttan sonra state'leri sıfırla
      setTitle("");
      setDescription("");
      setPrepTime(undefined);
      setCookTime(undefined);
      setServings(undefined);
      setIngredient([{ id: uuidv4(), name: "", quantity: "", unit: "" }]);
      setInstruction([{ id: uuidv4(), step: "" }]);
      setPhotos([]);
      setCategories([]);
      setTag([]);
      setNewInstructionStep("");
      setCurrentInstructionPhoto(null);
      setCurrentInstructionTimer("");

      navigation.goBack();
    } catch (error) {
      console.error("Error saving/updating recipe:", error);
      Alert.alert(
        "Error",
        "An error occurred while saving/updating the recipe."
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (recipeToEdit) {
        setTitle(recipeToEdit.title || "");
        setDescription(recipeToEdit.description || "");
        setPrepTime(recipeToEdit.prepTime?.toString() || undefined);
        setCookTime(recipeToEdit.cookTime?.toString() || undefined);
        setServings(recipeToEdit.servings?.toString() || undefined);

        setIngredient(
          recipeToEdit.ingredients?.map((ing) => {
            if (typeof ing === "string") {
              return { id: uuidv4(), name: ing, quantity: "", unit: "" };
            }
            return {
              id: ing.id || uuidv4(),
              name: ing.name || "",
              quantity: ing.quantity || "",
              unit: ing.unit || "",
            };
          }) || [{ id: uuidv4(), name: "", quantity: "", unit: "" }]
        );

        setInstruction(
          recipeToEdit.instructions?.map((inst) => {
            if (typeof inst === "string") {
              return { id: uuidv4(), step: inst };
            }
            return {
              id: inst.id || uuidv4(),
              step: inst.step || "",
              photoUri: inst.photoUri || undefined,
              timerDuration: inst.timerDuration || undefined,
            };
          }) || []
        );
        setCategories(recipeToEdit.categories || []);
        setTag(recipeToEdit.tags || []);
        setPhotos(recipeToEdit.photos || []);
      } else {
        setTitle("");
        setDescription("");
        setPrepTime(undefined);
        setCookTime(undefined);
        setServings(undefined);
        setIngredient([]);
        setInstruction([]);
        setCategories([]);
        setTag([]);
        setPhotos([]);
        setNewInstructionStep("");
        setCurrentInstructionPhoto(null);
        setCurrentInstructionTimer("");
      }
    }, [recipeToEdit])
  );

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
          mode="outlined"
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={AddRecipeScreenStyles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
        />
        <TextInput
          placeholder="Prepare Time (min)"
          value={prepTime !== undefined ? String(prepTime) : ""}
          onChangeText={handlePrepTime}
          style={AddRecipeScreenStyles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        <TextInput
          placeholder="Cook Time (min)"
          value={cookTime !== undefined ? String(cookTime) : ""}
          onChangeText={handleCookTime}
          style={AddRecipeScreenStyles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        <TextInput
          placeholder="Servings (person)"
          value={servings !== undefined ? String(servings) : ""}
          onChangeText={handleServings}
          style={AddRecipeScreenStyles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        <Text variant="titleMedium" style={AddRecipeScreenStyles.sectionTitle}>
          Ingredients
        </Text>
        {ingredient.map((ingredientItem) => (
          <View
            key={ingredientItem.id}
            style={AddRecipeScreenStyles.rowContainer}
          >
            <TextInput
              label="Amount"
              value={ingredientItem.quantity}
              onChangeText={(text) =>
                handleIngredientChange(ingredientItem.id, "quantity", text)
              }
              mode="outlined"
              style={AddRecipeScreenStyles.ingredientInput}
              keyboardType="numeric"
            />
            <TextInput
              label="Unit (g, pcs, cup)"
              value={ingredientItem.unit}
              onChangeText={(text) =>
                handleIngredientChange(ingredientItem.id, "unit", text)
              }
              mode="outlined"
              style={AddRecipeScreenStyles.ingredientInput}
            />
            <TextInput
              label="Ingredient Name"
              value={ingredientItem.name}
              onChangeText={(text) =>
                handleIngredientChange(ingredientItem.id, "name", text)
              }
              mode="outlined"
              style={AddRecipeScreenStyles.ingredientInput}
            />
            <IconButton
              icon="close-circle"
              iconColor="red"
              size={28}
              onPress={() => handleRemoveIngredient(ingredientItem.id)}
              accessibilityLabel="Delete Ingredient"
            />
          </View>
        ))}
        <Button
          mode="outlined"
          onPress={handleAddIngredient}
          style={AddRecipeScreenStyles.addButton}
          icon="plus-circle"
        >
          Add Ingredient
        </Button>

        <Text variant="titleMedium" style={AddRecipeScreenStyles.sectionTitle}>
          Instructions
        </Text>

        <TextInput
          style={AddRecipeScreenStyles.textArea}
          placeholder="Enter new instruction step"
          multiline
          numberOfLines={3}
          value={newInstructionStep}
          onChangeText={setNewInstructionStep}
          mode="outlined"
        />

        <View style={AddRecipeScreenStyles.instructionAddRow}>
          <TextInput
            style={[
              AddRecipeScreenStyles.input,
              AddRecipeScreenStyles.halfWidthInput,
            ]}
            placeholder="Timer (min)"
            keyboardType="numeric"
            value={currentInstructionTimer}
            onChangeText={setCurrentInstructionTimer}
            mode="outlined"
          />
          {currentInstructionPhoto ? (
            <View style={AddRecipeScreenStyles.currentInstructionPhotoPreview}>
              <Image
                source={{ uri: currentInstructionPhoto }}
                style={AddRecipeScreenStyles.instructionImagePreviewSmall}
              />
              <IconButton
                icon="close-circle"
                iconColor="red"
                size={25}
                style={AddRecipeScreenStyles.removePhotoIconSmall}
                onPress={() => setCurrentInstructionPhoto(null)}
              />
            </View>
          ) : (
            <Button
              mode="outlined"
              onPress={() => pickImage(true, undefined)}
              icon="camera"
              style={[
                AddRecipeScreenStyles.addButton,
                AddRecipeScreenStyles.halfWidthButton,
              ]}
            >
              Add Instruction Photo
            </Button>
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleAddInstruction}
          style={AddRecipeScreenStyles.addButton}
          icon="plus-circle"
        >
          Add Step
        </Button>

        {instruction.map((ins, index) => (
          <View key={ins.id} style={AddRecipeScreenStyles.instructionItem}>
            <View style={AddRecipeScreenStyles.instructionContent}>
              <Text style={AddRecipeScreenStyles.instructionNumber}>
                {index + 1}.
              </Text>
              <TextInput
                style={AddRecipeScreenStyles.instructionTextInput}
                value={ins.step}
                onChangeText={(text) =>
                  handleInstructionChange(ins.id, "step", text)
                }
                multiline
                numberOfLines={2}
                mode="outlined"
              />

              <View style={AddRecipeScreenStyles.instructionExtraFields}>
                <TextInput
                  style={[
                    AddRecipeScreenStyles.input,
                    AddRecipeScreenStyles.quarterWidthInput,
                  ]}
                  placeholder="Min"
                  keyboardType="numeric"
                  value={ins.timerDuration?.toString() || ""}
                  onChangeText={(text) =>
                    handleInstructionChange(
                      ins.id,
                      "timerDuration",
                      parseFloat(text) || undefined
                    )
                  }
                  mode="outlined"
                />
                {ins.photoUri ? (
                  <View style={AddRecipeScreenStyles.instructionImageDisplay}>
                    <Image
                      source={{ uri: ins.photoUri }}
                      style={AddRecipeScreenStyles.instructionImagePreviewSmall}
                    />
                    <IconButton
                      icon="close-circle"
                      iconColor="red"
                      size={20}
                      style={AddRecipeScreenStyles.removePhotoIconSmall}
                      onPress={() =>
                        handleInstructionChange(ins.id, "photoUri", undefined)
                      }
                    />
                  </View>
                ) : (
                  <Button
                    mode="outlined"
                    onPress={() => pickImage(true, ins.id)}
                    icon="camera"
                    style={[
                      AddRecipeScreenStyles.instructionPhotoButton,
                      AddRecipeScreenStyles.quarterWidthButton,
                    ]}
                  >
                    Photo
                  </Button>
                )}
              </View>
            </View>

            <View style={AddRecipeScreenStyles.instructionActions}>
              <IconButton
                icon="delete"
                iconColor="red"
                size={25}
                onPress={() => handleRemoveInstruction(ins.id)}
              />
            </View>
          </View>
        ))}

        <Text variant="titleMedium" style={AddRecipeScreenStyles.sectionTitle}>
          Photos
        </Text>
        {photos.length > 0 && (
          <View style={AddRecipeScreenStyles.photoPreviewContainer}>
            {photos.map((uri, index) => (
              <View
                key={index}
                style={AddRecipeScreenStyles.singlePhotoPreviewWrapper}
              >
                <Image
                  source={{ uri }}
                  style={AddRecipeScreenStyles.photoPreview}
                />
                <IconButton
                  icon="close-circle"
                  iconColor="red"
                  size={24}
                  style={AddRecipeScreenStyles.removeSingleImageIcon}
                  onPress={() =>
                    setPhotos((prev) => prev.filter((_, i) => i !== index))
                  }
                />
              </View>
            ))}
          </View>
        )}
        <Button
          mode="outlined"
          onPress={() => pickImage(false)}
          style={AddRecipeScreenStyles.addButton}
          icon="image-plus"
        >
          Add Recipe Photo
        </Button>

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
          style={AddRecipeScreenStyles.saveButton}
          icon="content-save"
        >
          Save Recipe
        </Button>
      </ScrollView>
    </View>
  );
}
