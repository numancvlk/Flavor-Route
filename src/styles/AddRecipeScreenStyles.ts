import { StyleSheet } from "react-native";
import { Colors, Spacing, FontSizes, globalStyles } from "./globalStyles"; // globalStyles'ı import et

const AddRecipeScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    padding: Spacing.medium,
    paddingBottom: Spacing.xLarge * 2,
  },
  input: {
    marginBottom: Spacing.medium,
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    marginTop: Spacing.large,
    marginBottom: Spacing.medium,
    color: Colors.text,
    fontSize: FontSizes.large,
    fontWeight: "bold",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.small,
  },
  ingredientInput: {
    flex: 1,
    marginRight: Spacing.small,
    backgroundColor: Colors.white,
  },
  instructionInput: {
    flex: 1,
    marginRight: Spacing.small,
    backgroundColor: Colors.white,
    minHeight: 100,
    textAlignVertical: "top",
  },
  addButton: {
    marginTop: Spacing.medium,
    marginBottom: Spacing.medium,
    paddingVertical: Spacing.small,
  },
  photoPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: Spacing.small,
    marginBottom: Spacing.small,
    resizeMode: "cover",
    ...globalStyles.shadow,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.medium,
  },
  chip: {
    marginRight: Spacing.small,
    marginBottom: Spacing.small,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  selectedChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  selectedChipText: {
    color: Colors.white,
  },
});

export default AddRecipeScreenStyles;
