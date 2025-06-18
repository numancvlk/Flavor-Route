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

export const RecipeDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  appBar: {
    backgroundColor: Colors.primary,
  },
  appBarTitle: {
    color: Colors.white,
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily,
  },
  favoriteButton: {
    marginRight: Spacing.medium,
  },
  scrollViewContent: {
    paddingBottom: Spacing.xxLarge * 3,
  },
  mainImage: {
    width: "100%",
    height: width * 0.6,
    resizeMode: "cover",
  },
  headerContainer: {
    padding: Spacing.medium,
    backgroundColor: Colors.cardBackground,
    marginBottom: Spacing.small,
    ...Shadows.small,
  },
  title: {
    fontSize: Typography.fontSize.xLarge,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    fontFamily: Typography.fontFamily,
    marginBottom: Spacing.small,
  },
  description: {
    fontSize: Typography.fontSize.medium,
    color: Colors.lightText,
    fontFamily: Typography.fontFamily,
    marginBottom: Spacing.medium,
    lineHeight: Typography.fontSize.medium * 1.4,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.small,
  },
  infoText: {
    fontSize: Typography.fontSize.small,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily,
    backgroundColor: Colors.lightGray,
    paddingVertical: Spacing.xSmall,
    paddingHorizontal: Spacing.small,
    borderRadius: Spacing.small,
    marginRight: Spacing.xSmall,
    marginBottom: Spacing.xSmall,
  },
  section: {
    backgroundColor: Colors.cardBackground,
    marginVertical: Spacing.small,
    borderRadius: Spacing.medium,
    marginHorizontal: Spacing.medium,
    ...Shadows.small,
  },
  sectionHeader: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    fontFamily: Typography.fontFamily,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  listItem: {
    paddingVertical: Spacing.xSmall,
    paddingHorizontal: Spacing.medium,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGray,
  },
  listItemText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.text,
    fontFamily: Typography.fontFamily,
    lineHeight: Typography.fontSize.medium * 1.4,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: Spacing.small,
  },
  chip: {
    margin: Spacing.xSmall,
    backgroundColor: Colors.lightGray,
  },
  chipText: {
    fontSize: Typography.fontSize.small,
    color: Colors.text,
    fontFamily: Typography.fontFamily,
  },
  dateText: {
    fontSize: Typography.fontSize.small,
    color: Colors.mediumGray,
    fontFamily: Typography.fontFamily,
    textAlign: "right",
    paddingHorizontal: Spacing.medium,
    marginTop: Spacing.small,
  },
  startButton: {
    marginHorizontal: Spacing.medium,
    marginBottom: Spacing.small,
    backgroundColor: Colors.primary,
    ...Shadows.default,
  },
  startButtonLabel: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    fontFamily: Typography.fontFamily,
  },
  deleteButton: {
    marginHorizontal: Spacing.medium,
    marginBottom: Spacing.small,
    borderColor: Colors.error,
    borderWidth: 1,
  },
  deleteButtonLabel: {
    color: Colors.error,
    fontFamily: Typography.fontFamily,
  },
  editButton: {
    marginHorizontal: Spacing.medium,
    marginBottom: Spacing.large,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  editButtonLabel: {
    color: Colors.primary,
    fontFamily: Typography.fontFamily,
  },
});
