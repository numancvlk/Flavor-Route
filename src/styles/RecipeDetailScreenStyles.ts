import { StyleSheet, Dimensions } from "react-native";
import { Colors, Spacing, Typography, FontSizes } from "./globalStyles";

const screenWidth = Dimensions.get("window").width;

export const RecipeDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  appBar: {
    backgroundColor: Colors.primary,
    elevation: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  appBarTitle: {
    color: Colors.white,
    fontSize: FontSizes.large,
  },
  favoriteButton: {
    paddingRight: Spacing.medium,
  },
  scrollViewContent: {
    paddingBottom: Spacing.large * 3,
  },
  mainImage: {
    width: screenWidth,
    height: screenWidth * 0.7,
    resizeMode: "cover",
    marginBottom: Spacing.medium,
  },
  headerContainer: {
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  title: {
    fontSize: FontSizes.title,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: Spacing.small,
  },
  description: {
    fontSize: FontSizes.medium,
    color: Colors.text,
    marginBottom: Spacing.small,
    lineHeight: Typography.lineHeightLarge,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: Spacing.small,
    paddingVertical: Spacing.small,
    marginVertical: Spacing.small,
  },
  infoText: {
    fontSize: FontSizes.small,
    color: Colors.darkGray,
    fontWeight: "bold",
    marginHorizontal: Spacing.small,
  },
  section: {
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  sectionHeader: {
    fontSize: FontSizes.large,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: Spacing.small,
    paddingLeft: Spacing.small,
  },
  listItem: {
    paddingVertical: Spacing.small,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  listItemText: {
    fontSize: FontSizes.medium,
    color: Colors.text,
    marginLeft: Spacing.small,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Spacing.small,
  },
  chip: {
    marginRight: Spacing.small / 2,
    marginBottom: Spacing.small / 2,
    backgroundColor: Colors.accent,
    borderRadius: Spacing.large,
  },
  chipText: {
    fontSize: FontSizes.small,
    color: Colors.white,
  },
  dateText: {
    fontSize: FontSizes.small,
    color: Colors.darkGray,
    textAlign: "right",
    paddingHorizontal: Spacing.medium,
    marginTop: Spacing.small,
  },
  startButton: {
    position: "absolute",
    bottom: Spacing.medium,
    left: Spacing.medium,
    right: Spacing.medium,
    backgroundColor: Colors.accent,
    borderRadius: Spacing.medium,
    elevation: 5,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonLabel: {
    fontSize: FontSizes.medium,
    color: Colors.white,
    paddingVertical: Spacing.small,
  },
  deleteButton: {
    position: "absolute",
    bottom: Spacing.medium,
    left: Spacing.medium,
    right: Spacing.medium,
    backgroundColor: Colors.accent,
    borderRadius: Spacing.medium,
    elevation: 5,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
