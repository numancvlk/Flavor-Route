import { StyleSheet, Dimensions } from "react-native";
import { Colors, Typography, Spacing, GlobalStyles } from "./globalStyles";

const { width } = Dimensions.get("window");
const cardMargin = Spacing.small;
const cardWidth = (width - Spacing.medium * 2 - cardMargin) / 2;

export const FavoritesScreenStyles = StyleSheet.create({
  mainContainer: {
    ...GlobalStyles.container,
    padding: Spacing.medium,
  },
  searchBar: {
    marginBottom: Spacing.medium,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.small,
    ...GlobalStyles.shadow,
  },
  searchBarInput: {
    color: Colors.text,
    fontFamily: Typography.fontFamily,
    fontSize: Typography.fontSize.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.large,
  },
  loadingText: {
    fontSize: Typography.fontSize.large,
    color: Colors.lightText,
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.medium,
  },
  recipesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: Spacing.medium,
  },
  recipeCard: {
    width: cardWidth,
    marginBottom: cardMargin,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.small,
    overflow: "hidden",
    ...GlobalStyles.shadow,
  },
  cardCover: {
    height: 120,
    resizeMode: "cover",
  },
  noImagePlaceholder: {
    height: 120,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: Colors.mediumGray,
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.medium,
    textAlign: "center",
  },
  favoriteIconContainer: {
    position: "absolute",
    top: Spacing.xSmall,
    right: Spacing.xSmall,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 15,
    padding: Spacing.xSmall / 2,
    zIndex: 1,
  },
  cardContent: {
    padding: Spacing.small,
  },
  cardTitle: {
    fontSize: Typography.fontSize.medium,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xSmall,
    fontFamily: Typography.fontFamily,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xSmall,
    marginBottom: Spacing.xSmall,
  },
  timeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.small,
    backgroundColor: Colors.lightGray,
    borderRadius: Spacing.small,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.xSmall,
  },
  timeText: {
    fontSize: Typography.fontSize.xSmall,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.medium,
  },
  servingsText: {
    fontSize: Typography.fontSize.small,
    color: Colors.lightText,
    fontFamily: Typography.fontFamily,
    marginTop: Spacing.xSmall,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xLarge,
    paddingHorizontal: Spacing.large,
  },
  noFavoritesText: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.small,
    fontFamily: Typography.fontFamily,
  },
  noFavoritesSubText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.lightText,
    textAlign: "center",
    lineHeight: Typography.fontSize.medium * 1.5,
    fontFamily: Typography.fontFamily,
  },
});
