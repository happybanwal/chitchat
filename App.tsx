import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppStackNavigator from "./src/navigation/AppStackNavigator";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import React from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("./assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Light": require("./assets/fonts/Manrope-Light.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
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
