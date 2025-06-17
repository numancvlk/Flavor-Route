import { StyleSheet } from "react-native";

export const Colors = {
  primary: "#6200EE",
  accent: "#03DAC4",
  background: "#F6F6F6",
  text: "#333333",
  lightGray: "#CCCCCC",
  mediumGray: "#999999",
  darkGray: "#666666",
  white: "#FFFFFF",
  red: "#FF0000",
  green: "#4CAF50",
};

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xLarge: 32,
};

export const FontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  title: 28,
};

export const Typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    semiBold: "System",
    bold: "System",
  },
  fontSize: {
    small: FontSizes.small,
    medium: FontSizes.medium,
    large: FontSizes.large,
    extraLarge: FontSizes.xLarge,
    title: FontSizes.title,
  },

  h1: {
    fontSize: FontSizes.title,
    fontWeight: "bold" as "bold",
    color: Colors.text,
  },
  h2: {
    fontSize: FontSizes.xLarge,
    fontWeight: "bold" as "bold",
    color: Colors.text,
  },
  h3: {
    fontSize: FontSizes.large,
    fontWeight: "bold" as "bold",
    color: Colors.text,
  },
  h4: {
    fontSize: FontSizes.medium,
    fontWeight: "bold" as "bold",
    color: Colors.text,
  },
  h5: {
    fontSize: FontSizes.large,
    fontWeight: "bold" as "bold",
    color: Colors.text,
  },
  h6: {
    fontSize: FontSizes.medium,
    fontWeight: "bold" as "bold",
    color: Colors.text,
  },
  body1: { fontSize: FontSizes.medium, color: Colors.text },
  body2: { fontSize: FontSizes.small, color: Colors.text },
  caption: { fontSize: FontSizes.small, color: Colors.mediumGray },
  button: { fontSize: FontSizes.medium, fontWeight: "bold" as "bold" },
  lineHeightLarge: 24,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.medium,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
