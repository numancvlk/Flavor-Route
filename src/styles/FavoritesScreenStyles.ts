import { StyleSheet, Dimensions } from "react-native";
import { Colors, Spacing, FontSizes, globalStyles } from "./globalStyles";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - Spacing.medium;
export const FavoritesScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchBar: {
    margin: Spacing.medium,
    borderRadius: Spacing.small,
    backgroundColor: Colors.white,
  },
  searchBarInput: {
    minHeight: Spacing.xLarge + Spacing.small,
    fontSize: FontSizes.medium,
    color: Colors.text,
  },
  recipesGrid: {
    padding: Spacing.small,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: Spacing.large,
  },
  recipeCard: {
    width: cardWidth,
    marginBottom: Spacing.small,
    borderRadius: Spacing.small,
    overflow: "hidden",
    backgroundColor: Colors.white,
    ...globalStyles.shadow,
  },
  cardCover: {
    height: 120,
  },
  noImagePlaceholder: {
    height: 120,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: Colors.darkGray,
    fontSize: FontSizes.medium,
  },
  favoriteIconContainer: {
    position: "absolute",
    top: Spacing.small / 2,
    right: Spacing.small / 2,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: Spacing.xLarge / 2,
    padding: Spacing.small / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    padding: Spacing.small,
  },
  cardTitle: {
    fontSize: FontSizes.medium,
    fontWeight: "bold",
    marginBottom: Spacing.small / 2,
    color: Colors.text,
  },
  timeContainer: {
    flexDirection: "row",
    marginBottom: Spacing.small / 2,
  },
  timeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.small,
  },
  timeText: {
    fontSize: FontSizes.small,
    color: Colors.darkGray,
  },
  servingsText: {
    fontSize: FontSizes.small,
    color: Colors.darkGray,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.large,
    minHeight: Dimensions.get("window").height * 0.5,
  },
  noFavoritesText: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: Colors.darkGray,
    textAlign: "center",
    marginBottom: Spacing.small,
  },
  noFavoritesSubText: {
    fontSize: FontSizes.medium,
    color: Colors.mediumGray,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: FontSizes.large,
    color: Colors.darkGray,
  },
});
