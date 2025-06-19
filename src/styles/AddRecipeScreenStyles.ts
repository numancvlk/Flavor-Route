import { StyleSheet } from "react-native";

export const AddRecipeScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 16,
  },
  scrollViewContent: {
    paddingBottom: 120,
  },

  input: {
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },

  textArea: {
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
    textAlign: "center",
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#BBB",
    paddingBottom: 6,
    color: "#333",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  ingredientInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlign: "center",
  },

  addButton: {
    marginVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },

  instructionAddRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  halfWidthInput: {
    flex: 1,
  },

  halfWidthButton: {
    flex: 1,
    borderRadius: 8,
  },

  currentInstructionPhotoPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },

  instructionImagePreviewSmall: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },

  removePhotoIconSmall: {
    margin: 0,
  },

  instructionItem: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#CCC",
  },

  instructionContent: {
    flexDirection: "column",
  },

  instructionNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#444",
  },

  instructionTextInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 8,
    paddingHorizontal: 10,
    textAlign: "center",
  },

  instructionExtraFields: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  instructionPhotoButton: {
    flex: 1,
    borderRadius: 8,
  },

  quarterWidthInput: {
    width: 80,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    textAlign: "center",
  },

  quarterWidthButton: {
    width: 80,
    borderRadius: 8,
  },

  instructionImageDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  instructionActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },

  photoPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },

  singlePhotoPreviewWrapper: {
    position: "relative",
  },

  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
  },

  removeSingleImageIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#fff",
    borderRadius: 12,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  chip: {
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 20,
  },

  selectedChip: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },

  selectedChipText: {
    color: "#fff",
  },

  saveButton: {
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
