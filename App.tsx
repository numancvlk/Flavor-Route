import { NavigationContainer } from "@react-navigation/native";

//-----------------COMPONENENTS----------------------
import AppNavigator from "./src/navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
