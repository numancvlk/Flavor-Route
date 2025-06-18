import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

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

export const FavoritesScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchBar: {
    margin: Spacing.medium,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.medium,
    ...Shadows.small,
  },
  searchBarInput: {
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily,
    color: Colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: Typography.fontSize.large,
    color: Colors.lightText,
    fontFamily: Typography.fontFamily,
  },
  recipesGrid: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.large,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recipeCard: {
    width: cardWidth,
    marginVertical: Spacing.small,
    borderRadius: Spacing.medium,
    overflow: "hidden",
    ...Shadows.default,
  },
  cardCover: {
    height: cardWidth * 0.75,
    borderTopLeftRadius: Spacing.medium,
    borderTopRightRadius: Spacing.medium,
  },
  noImagePlaceholder: {
    width: "100%",
    height: cardWidth * 0.75,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: Spacing.medium,
    borderTopRightRadius: Spacing.medium,
  },
  noImageText: {
    color: Colors.mediumGray,
    fontSize: Typography.fontSize.small,
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
    padding: Spacing.small,
  },
  cardTitle: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    fontFamily: Typography.fontFamily,
    marginBottom: Spacing.xSmall,
    lineHeight: Typography.fontSize.medium * 1.3,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.xSmall,
  },
  timeItem: {
    marginRight: Spacing.small,
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: Typography.fontSize.xSmall,
    color: Colors.lightText,
    fontFamily: Typography.fontFamily,
  },
  servingsText: {
    fontSize: Typography.fontSize.small,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.medium,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.large,
    marginTop: Spacing.xxLarge,
  },
  noFavoritesText: {
    fontSize: Typography.fontSize.large,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily,
    textAlign: "center",
    marginBottom: Spacing.small,
    fontWeight: Typography.fontWeight.bold,
  },
  noFavoritesSubText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.mediumGray,
    fontFamily: Typography.fontFamily,
    textAlign: "center",
    lineHeight: Typography.fontSize.medium * 1.4,
  },
});
