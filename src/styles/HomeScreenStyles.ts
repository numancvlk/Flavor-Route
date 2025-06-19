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

export const HomeScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    padding: Spacing.medium,
    paddingBottom: Spacing.xxLarge * 2,
  },
  searchBar: {
    marginBottom: Spacing.medium,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.medium,
    ...Shadows.small,
  },
  noRecipesText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.lightText,
    textAlign: "center",
    marginTop: Spacing.xLarge,
    fontFamily: Typography.fontFamily,
  },
  recipeCard: {
    marginBottom: Spacing.medium,
    borderRadius: Spacing.medium,
    overflow: "hidden",
    ...Shadows.default,
  },
  cardCover: {
    height: width * 0.5,
    borderTopLeftRadius: Spacing.medium,
    borderTopRightRadius: Spacing.medium,
  },
  noImagePlaceholder: {
    width: "100%",
    height: width * 0.5,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: Spacing.medium,
    borderTopRightRadius: Spacing.medium,
  },
  noImageText: {
    color: Colors.mediumGray,
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily,
  },
  favoriteIconContainer: {
    position: "absolute",
    top: Spacing.small,
    right: Spacing.small,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: Spacing.xSmall,
    ...Shadows.small,
  },
  cardContent: {
    padding: Spacing.medium,
  },
  cardTitle: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    fontFamily: Typography.fontFamily,
    marginBottom: Spacing.xSmall,
  },
  cardParagraph: {
    fontSize: Typography.fontSize.medium,
    color: Colors.lightText,
    fontFamily: Typography.fontFamily,
    marginBottom: Spacing.small,
    lineHeight: Typography.fontSize.medium * 1.4,
  },
  cardCategoryTag: {
    fontSize: Typography.fontSize.small,
    color: Colors.primary,
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.xSmall,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    ...Shadows.default,
  },
});
