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

export const Typography = {
  fontFamily: {
    regular: "System", // Varsayılan sistem fontu
    medium: "System",
    semiBold: "System",
    bold: "System",
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    extraLarge: 24,
  },
};
