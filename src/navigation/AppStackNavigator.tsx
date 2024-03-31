import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/auth/signUp/SignUp";
import Login from "../screens/auth/login/Login";
import Home from "../screens/home/Home";
import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../store/slices/UserSlice";

const AppStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log({isLoggedIn:isLoggedIn})
  const data = useSelector((state: any) => {
    return state.users;
  });

  useEffect(() => {});
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        {/* { !isLoggedIn ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )} */}
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;

const styles = StyleSheet.create({});
