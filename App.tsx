import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppStackNavigator from "./src/navigation/AppStackNavigator";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Manrope-Bold": require("./src/assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("./src/assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-Medium": require("./src/assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("./src/assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Light": require("./src/assets/fonts/Manrope-Light.ttf"),
    "Manrope-SemiBold": require("./src/assets/fonts/Manrope-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider>
      <AppStackNavigator />
    </PaperProvider>
  );
}

// #6A5BC2 -> blue
// #F4F185 ->yellow
