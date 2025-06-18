import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const Colors = {
  primary: "#FF6347",
  accent: "#FFD700",
  background: "#F8F8F8",
  cardBackground: "#FFFFFF",
  text: "#333333",
  lightText: "#666666",
  white: "#FFFFFF",
  black: "#000000",
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
} as const;

const Spacing = {
  xSmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 40,
};

const Shadows = {
  default: {
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  small: {
    shadowColor: Colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
};

export const AddRecipeScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    padding: Spacing.medium,
    paddingBottom: Spacing.xxLarge,
  },
  input: {
    backgroundColor: Colors.cardBackground,
    marginBottom: Spacing.medium,
    fontFamily: Typography.fontFamily,
    fontSize: Typography.fontSize.medium,
    color: Colors.text,
    borderRadius: Spacing.xSmall,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.large + 2,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    fontFamily: Typography.fontFamily,
    marginTop: Spacing.large,
    marginBottom: Spacing.small,
    paddingBottom: Spacing.xSmall,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.lightGray,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.small,
  },
  ingredientInput: {
    flex: 1,
    marginRight: Spacing.xSmall,
    backgroundColor: Colors.cardBackground,
    fontFamily: Typography.fontFamily,
    fontSize: Typography.fontSize.small,
    borderRadius: Spacing.xSmall,
  },
  instructionInput: {
    flex: 1,
    marginRight: Spacing.xSmall,
    backgroundColor: Colors.cardBackground,
    minHeight: 120,
    textAlignVertical: "top",
    fontFamily: Typography.fontFamily,
    fontSize: Typography.fontSize.medium,
    borderRadius: Spacing.xSmall,
  },
  iconButton: {
    margin: 0,
    padding: Spacing.xSmall,
  },
  addButton: {
    marginTop: Spacing.small,
    marginBottom: Spacing.medium,
    borderRadius: Spacing.small,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    ...Shadows.small,
    height: Spacing.xxLarge,
    justifyContent: "center",
  },
  photoPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Spacing.medium,
    marginBottom: Spacing.medium,
    justifyContent: "flex-start",
  },
  photoPreviewWrapper: {
    margin: Spacing.xSmall,
    position: "relative",
    ...Shadows.small,
    borderRadius: Spacing.small,
  },
  photoPreview: {
    width: (width - Spacing.medium * 2 - Spacing.xSmall * 4) / 3,
    height: (width - Spacing.medium * 2 - Spacing.xSmall * 4) / 3,
    borderRadius: Spacing.small,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  removePhotoIcon: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Colors.error,
    borderRadius: 15,
    zIndex: 1,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.medium,
    marginTop: Spacing.xSmall,
  },
  chip: {
    marginRight: Spacing.xSmall,
    marginBottom: Spacing.xSmall,
    backgroundColor: Colors.lightGray,
    borderColor: Colors.mediumGray,
    borderRadius: Spacing.large,
    paddingHorizontal: Spacing.xSmall,
    ...Shadows.small,
  },
  selectedChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    ...Shadows.default,
  },
  chipText: {
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily,
    fontSize: Typography.fontSize.small,
  },
  selectedChipText: {
    color: Colors.white,
    fontWeight: Typography.fontWeight.bold,
  },
  saveButton: {
    marginTop: Spacing.large,
    marginBottom: Spacing.medium,
    backgroundColor: Colors.primary,
    borderRadius: Spacing.xxLarge,
    height: Spacing.xxLarge + Spacing.small,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.default,
  },
});
