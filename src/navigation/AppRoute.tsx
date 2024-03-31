import { View, Text } from "react-native";
import React from "react";
// import { selectIsLoggedIn } from "../store/slices/UserSlice";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { selectIsLoggedIn } from "../store/slices/AuthSlice";

const AppRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <NavigationContainer>
      {/* Conditional stack navigator rendering based on login state */}

      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
