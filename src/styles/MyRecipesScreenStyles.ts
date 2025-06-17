import { StyleSheet, Dimensions } from "react-native";
import { Colors, FontSizes, Typography } from "./globalStyles";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 15; //

export const MyRecipesScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchBar: {
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: Colors.white,
  },
  searchBarInput: {
    fontSize: FontSizes.medium,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text,
  },
  recipesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 5,
    paddingBottom: 80,
  },
  recipeCard: {
    width: cardWidth,
    margin: 5,
    borderRadius: 8,
    elevation: 3,
    overflow: "hidden",
    backgroundColor: Colors.white,
    position: "relative",
  },
  cardCover: {
    height: cardWidth * 0.75,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 5,
    fontFamily: Typography.fontFamily.bold,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  timeItem: {
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
  },
  timeText: {
    fontSize: FontSizes.small,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.regular,
  },
  servingsText: {
    fontSize: FontSizes.small,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.regular,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },

  noImagePlaceholder: {
    width: "100%",
    height: cardWidth * 0.75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  noImageText: {
    color: Colors.mediumGray,
    fontSize: FontSizes.medium,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: Typography.fontFamily.semiBold,
  },

  favoriteIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  favoriteIconButton: {
    margin: 0,
  },

  noRecipesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
    width: screenWidth,
  },
  noRecipesText: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: Typography.fontFamily.bold,
  },
  noRecipesSubText: {
    fontSize: FontSizes.medium,
    color: Colors.darkGray,
    textAlign: "center",
    fontFamily: Typography.fontFamily.regular,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: Colors.darkGray,
  },
});
