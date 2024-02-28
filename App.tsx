import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppStackNavigator from "./src/navigation/AppStackNavigator";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Manrope-Bold": require("./src/assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("./src/assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-Medium": require("./src/assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("./src/assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Light": require("./src/assets/fonts/Manrope-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return <AppStackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
