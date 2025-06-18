import { StyleSheet } from "react-native";

import { Colors, Typography, Spacing, GlobalStyles } from "./globalStyles";

export const HomeScreenStyles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  scrollViewContent: {
    padding: Spacing.medium,
    paddingBottom: Spacing.xxLarge * 2,
  },
  searchBar: {
    marginBottom: Spacing.medium,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.small,
    ...GlobalStyles.shadow,
  },
  noRecipesText: {
    textAlign: "center",
    marginTop: Spacing.xLarge,
    fontSize: Typography.fontSize.medium,
    color: Colors.lightText,
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.regular,
  },
  recipeCard: {
    marginBottom: Spacing.medium,
    borderRadius: Spacing.small,
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
    ...GlobalStyles.shadow,
  },
  cardCover: {
    height: 200,
    resizeMode: "cover",
  },
  noImagePlaceholder: {
    height: 200,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: Colors.mediumGray,
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.medium,
  },
  favoriteIconContainer: {
    position: "absolute",
    top: Spacing.small,
    right: Spacing.small,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: Spacing.xSmall,
    zIndex: 1,
  },
  cardContent: {
    padding: Spacing.medium,
  },
  cardTitle: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xSmall,
    fontFamily: Typography.fontFamily,
  },
  cardParagraph: {
    fontSize: Typography.fontSize.medium,
    color: Colors.lightText,
    marginBottom: Spacing.small,
    fontFamily: Typography.fontFamily,
  },
  cardCategoryTag: {
    backgroundColor: Colors.lightGray,
    color: Colors.text,
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.xSmall,
    borderRadius: Spacing.small,
    marginRight: Spacing.xSmall,
    marginBottom: Spacing.xSmall,
  },
  fab: {
    position: "absolute",
    margin: Spacing.large,
    right: 0,
    bottom: Spacing.medium,
    backgroundColor: Colors.primary,
  },
});
