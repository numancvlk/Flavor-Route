import { StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";

export const CookingModeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  progressBar: {
    height: 5,
    backgroundColor: MD2Colors.grey300,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  instructionText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  instructionImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: MD2Colors.blueGrey50,
    padding: 15,
    borderRadius: 10,
    width: "90%",
    flexWrap: "wrap",
  },
  timerText: {
    fontSize: 38,
    fontWeight: "bold",
    color: MD2Colors.blue800,
    marginRight: 20,
  },
  timerButton: {
    marginVertical: 5,
    minWidth: 120,
  },
  resetButton: {
    marginVertical: 5,
    marginLeft: 10,
    minWidth: 100,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  navButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 8,
  },
  photoPreviewWrapper: {
    position: "relative",
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  removePhotoIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
  },
});
