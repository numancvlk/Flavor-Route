import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  FontSizes,
  globalStyles,
  Typography,
} from "./globalStyles";

const HomeScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    padding: Spacing.medium,
    paddingBottom: Spacing.xLarge * 2,
  },
  searchBar: {
    marginBottom: Spacing.medium,
    backgroundColor: Colors.white,
    borderRadius: Spacing.small,
    ...globalStyles.shadow,
  },
  recipeCard: {
    marginBottom: Spacing.medium,
    borderRadius: Spacing.small,
    overflow: "hidden",
    ...globalStyles.shadow,
  },
  cardCover: {
    height: 180,
    width: "100%",
  },
  noImagePlaceholder: {
    width: "100%",
    height: 180,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: Colors.mediumGray,
    fontSize: FontSizes.medium,
    fontFamily: Typography.fontFamily.semiBold,
  },
  cardContent: {
    padding: Spacing.medium,
  },
  cardTitle: {
    fontSize: FontSizes.large,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text,
    marginBottom: Spacing.small / 2,
  },
  cardParagraph: {
    fontSize: FontSizes.small,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.darkGray,
    marginBottom: Spacing.small,
  },
  cardCategory: {
    fontSize: FontSizes.small,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.mediumGray,
    marginTop: Spacing.small / 2,
  },
  noRecipesText: {
    textAlign: "center",
    marginTop: Spacing.xLarge,
    fontSize: FontSizes.medium,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.regular,
  },
  fab: {
    position: "absolute",
    margin: Spacing.large,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.accent,
  },
});

export default HomeScreenStyles;
